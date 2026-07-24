import { useEffect, useRef, useState } from "react";
import './index.css'
import BoschButton from "../BoschButton";
import TextBox from "../TextBox";
import DropdownList from "../DropdownList";
import FrequencySelector from "../FrequencySelector";
import { getData, postData } from "../../utils/apiBack";
import { toastError, toastSuccess, toastWarning } from '../../components/BoschToast';

function Dialog({ isOpen, onClose, type, setType, title, event }) {
    const dialogRef = useRef(null);

    const [responsible, setResponsible] = useState(null);
    const [allInstructors, setAllInstructors] = useState([]);
    const [allPeople, setAllPeople] = useState([]);

    const [studentClass, setStudentClass] = useState(null)
    const [selectedClass, setSelectedClass] = useState(null);
    const [allClasses, setAllClasses] = useState([]);

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [allRooms, setAllRooms] = useState([]);

    const [typeEvent, setTypeEvent] = useState(null);
    const [eventName, setEventName] = useState("");
    const [selectedParticipant, setSelectedParticipant] = useState("");
    const [participants, setParticipants] = useState([]);

    const [newSubjectName, setNewSubjectName] = useState("")
    const [newSubjectWorkload, setNewSubjectWorkload] = useState("")

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleCancel = (event) => {
            event.preventDefault();
            onClose();
        };

        dialog.addEventListener("cancel", handleCancel);
        return () => dialog.removeEventListener("cancel", handleCancel);
    }, [onClose]);

    useEffect(() => {
        getAllRooms();
        getAllClasses();
        getAllPeople();
        getAllInstructors();
    }, []);
    
    const getAllRooms = async () => {
        try {
            const rooms = await getData("/room/all");

            const formattedRooms = rooms.map((room) => ({
                value: room.room_id,
                label: room.title
            }));

            setAllRooms(formattedRooms);
        } catch (error) {
            toastError(`Erro: ${error.message}`)
        }
    };

    const getAllClasses = async () => {
        try {
            const classes = await getData("/class/all");

            const formatedClasses = classes.map((c) => ({
                value: c.class_id,
                label: c.name
            }));

            setAllClasses(formatedClasses);
        } catch (error) {
            toastError(`Erro: ${error.message}`)
        }
    };

    const getAllPeople = async () => {
        try {
            const people = await getData("/user/all");

            const formatedPeople = people.map((p) => ({
                value: p.id,
                label: p.name
            }));

            setAllPeople(formatedPeople);
        } catch (error) {
            toastError(`Erro: ${error.message}`)
        }
    };

    const getAllInstructors = async () => {
        try {
            const people = await getData("/user/instructors");

            const formatedInstructors = people.map((p) => ({
                value: p.id,
                label: p.name
            }));

            setAllInstructors(formatedInstructors);
        } catch (error) {
            toastError(`Erro: ${error.message}`)
        }
    };

    const create = async () => {
        try {
            let eventType = "";
            let edv;
            let user;
            let userId;
            let payload;
            let isInserted;
            let eventId;

            switch (type) {
                case "event": {
                    switch (typeEvent) {
                        case 1:
                            if (!eventName.trim()) {
                                toastWarning("O título é obrigatório.");
                                return;
                            }

                            eventType = "EXTERNAL";

                            edv = sessionStorage.getItem("user");
                            user = await getData(`/user/edv/${edv}`);
                            userId = user.user.id;

                            payload = {
                                title: eventName,
                                eventType: eventType,
                                startDate: startDate,
                                endDate: endDate,
                                createdBy: userId,
                            };

                            isInserted = await postData("/event", payload);

                            if (!isInserted) {
                                onClose();
                                toastError("Falha ao criar evento.");
                                return;
                            }

                            eventId = isInserted.event_id;

                            onClose();
                            toastSuccess("Evento criado com sucesso!");
                            break;
                        case 2:
                            if (!eventName.trim()) {
                                toastWarning("O título é obrigatório.");
                                return;
                            }
                            
                            eventType = "LESSON";

                            edv = sessionStorage.getItem("user");
                            const user = await getData(`/user/edv/${edv}`);
                            const userId = user.user.id;

                            payload = {
                                title: eventName,
                                eventType: eventType,
                                startDate: startDate,
                                subjectInstructorId: responsible,
                                createdBy: userId,
                                roomId: selectedRoom,
                                startDate: startDate
                            };

                            console.log(payload)

                            // isInserted = await postData("/schedule/lessons", payload);

                            if (!isInserted) {
                                onClose();
                                toastError("Falha ao criar evento.");
                                return;
                            }

                            eventId = isInserted.event_id;

                            onClose();
                            toastSuccess("Aulas criadas com sucesso!");
                            break;
                        case 3:
                            eventType = "EXAM";
                            break;
                    }
                    break;
                }
                case "subject": {
                    const newSubject = {
                        name: newSubjectName,
                        workload: parseInt(newSubjectWorkload),
                        startDate: startDate,
                        classId: selectedClass
                    }

                    const isInserted = await postData("/subject", newSubject);

                    if (!isInserted) {
                        onClose();
                        toastError("Falha ao criar matéria.");
                        return;
                    }

                    onClose();
                    toastSuccess("Matéria criada com sucesso.")
                    break;
                }
            }
        } catch (error) {
            toastError(`Erro: ${error.message}`)
        }
    }

    const addRoom = () => {
        if (!selectedRoom) return;

        const room = allRooms.find(room => room.value === selectedRoom);

        if (!room) return;

        if (rooms.some(r => r.value === room.value)) return;

        setRooms([
            ...rooms,
            {
                ...room,
                isMain: rooms.length === 0
            }
        ]);

        setSelectedRoom(null);
    };


    const removeRoom = (id) => {
        const newRooms = rooms.filter(r => r.value !== id);

        if (!newRooms.some(r => r.isMain) && newRooms.length > 0) {
            newRooms[0].isMain = true;
        }

        setRooms([...newRooms]);
    };

    const addParticipant = () => {
        if (!selectedParticipant) return;

        const participant = allPeople.find(
            user => user.value === selectedParticipant
        );

        if (!participant) return;

        if (participants.some(p => p.value === participant.value)) return;

        setParticipants([...participants, participant]);
        setSelectedParticipant(null);
    };

    const removeParticipant = (id) => {
        setParticipants(participants.filter(p => p.value !== id));
    };

    const formatDateTimeLocal = (date) =>
        date
            ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                .toISOString()
                .slice(0, 16)
            : "";
    
    const setEvent = () => {
        setType("edit-event");
        setResponsible(event.responsible)
        console.log(event)
        if (event.eventType === "LESSON") {
            setTypeEvent(1);
        } else if (event.eventType === "EVENT") {
            setTypeEvent(2);
        } else if (event.eventType === "EXAM") {
            setTypeEvent(3);
        }
        console.log(typeEvent)

        setEventName(event.title);
        setResponsible(event.responsible);
        setSelectedRoom(event.roomId);
        setSelectedClass(event.classId);
        // setParticipants(event.participants);
        setStartDate(new Date(event.initial));
        setEndDate(new Date(event.end));
    }

    const typeEvents = [
        { value: 1, label: "Aula" },
        { value: 2, label: "Evento" },
        { value: 3, label: "Avaliação" }
    ];

    return (
        <dialog ref={dialogRef} className="customDialog">
            <div className="dialogHeader">
                <h2>{title}</h2>
                <button onClick={onClose} className="closeButton">x</button>
            </div>
            {type === "planning" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Data de Inicio:</h4>
                        <TextBox placeholder="e.g.: XX/XX/XXXX" />
                    </div>
                </div>
            }
            {type === "subject" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Nome da matéria:</h4>
                        <TextBox placeholder="e.g.: Internet das Coisas" onChange={(e) => setNewSubjectName(e.target.value)} />
                    </div>
                    <div className="dialogInput">
                        <h4>Turma:</h4>
                        <DropdownList options={allClasses} selectedValue={selectedClass} onChange={(e) => setSelectedClass(Number(e.target.value))} />
                    </div>
                    <div className="dialogInput">
                        <h4>Carga horária:</h4>
                        <TextBox placeholder="e.g.: 16h" onChange={(e) => setNewSubjectWorkload(e.target.value)} />
                    </div>
                    <div className="dialogInput">
                        <h4>Salas:</h4>
                        <div className="itemSelector">
                            <DropdownList options={allRooms} selectedValue={selectedRoom} onChange={(e) => setSelectedRoom(Number(e.target.value))} />
                            <button onClick={addRoom} className="addItem">+</button>
                        </div>
                    </div>
                    <div className="roomsList">
                        {rooms.map((room) => (
                            <div key={room.value} className={`listItem ${room.isMain ? "mainRoom" : ""}`}>
                                <span className="itemName">{room.isMain && "⭐ "}{room.label}</span>

                                <button className="removeItem" onClick={() => removeRoom(room.value)}>×</button>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: "280px" }}>
                        <h4>Frequência:</h4>
                        <FrequencySelector />
                    </div>
                </div>
            }
            {type === "event" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Tipo do evento:</h4>
                        <DropdownList options={typeEvents} selectedValue={typeEvent} onChange={(e) => setTypeEvent(Number(e.target.value))} />
                    </div>
                    <div className="dialogInput">
                        <h4>Título:</h4>
                        <TextBox placeholder="e.g.: Aula IoT/Setor/Prova Python" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    </div>
                    {typeEvent === 1 &&
                        <>
                            <div className="dialogInput">
                                <h4>Participantes:</h4>
                                <div className="itemSelector">
                                    <DropdownList options={allPeople} selectedValue={selectedParticipant} onChange={(e) => setSelectedParticipant(Number(e.target.value))} />
                                    <button onClick={addParticipant} className="addItem">+</button>
                                </div>
                            </div>
                            <div className="participantsList">
                                {participants.map((participant) => (
                                    <div key={participant.value} className="listItem">
                                        <span className="itemName">{participant.label}</span>

                                        <button className="removeItem" onClick={() => removeParticipant(participant.value)}>×</button>
                                    </div>
                                ))}
                            </div>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(startDate)} onChange={(e) => setStartDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(endDate)} onChange={(e) => setEndDate(new Date(e.target.value))} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "500px" }}>
                                <h4>Frequência:</h4>
                                <FrequencySelector />
                            </div>
                        </>
                    }
                    {typeEvent === 2 &&
                        <>
                            <div className="dialogInput">
                                <h4>Professor:</h4>
                                <DropdownList options={allInstructors} selectedValue={responsible} onChange={(e) => setResponsible(e.target.value)} />
                            </div>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(startDate)} onChange={(e) => setStartDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(endDate)} onChange={(e) => setEndDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Sala:</h4>
                                <DropdownList options={allRooms} selectedValue={selectedRoom} onChange={(e) => setSelectedRoom(Number(e.target.value))} />
                            </div>
                        </>
                    }
                    {typeEvent === 3 &&
                        <>
                            <div className="dialogInput">
                                <h4>Professor:</h4>
                                <DropdownList options={allInstructors} selectedValue={responsible} onChange={(e) => setResponsible(e.target.value)} />
                            </div>
                            <div className="dialogInput">
                                <h4>Sala:</h4>
                                <DropdownList options={allRooms} selectedValue={selectedRoom} onChange={(e) => setSelectedRoom(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(startDate)} onChange={(e) => setStartDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(endDate)} onChange={(e) => setEndDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Turma:</h4>
                                <DropdownList options={allClasses} selectedValue={selectedClass} onChange={(e) => setSelectedClass(Number(e.target.value))} />
                            </div>
                        </>
                    }
                </div>
            }
            {type === "student" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Nome do aluno:</h4>
                        <TextBox placeholder="e.g.: João Silveira" />
                    </div>
                    <div className="dialogInput">
                        <h4>Turma:</h4>
                        <DropdownList options={allClasses} selectedValue={studentClass} onChange={(e) => setStudentClass(Number(e.target.value))} />
                    </div>
                    <div className="dialogInput">
                        <h4>Data de nascimento:</h4>
                        <TextBox placeholder="XX/XX/XXXX" />
                    </div>
                    <div className="dialogInput">
                        <h4>EDV:</h4>
                        <TextBox placeholder="e.g.: 9290XXXX" />
                    </div>
                </div>
            }
            {type === "editDate" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Início:</h4>
                        <TextBox placeholder="XX/XX/XXXX XX:XX" />
                    </div>
                    <div className="dialogInput">
                        <h4>Encerramento:</h4>
                        <TextBox placeholder="XX/XX/XXXX XX:XX" />
                    </div>
                </div>
            }
            {type === "edit-event" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Tipo do evento:</h4>
                        <DropdownList options={typeEvents} selectedValue={typeEvent} onChange={(e) => setTypeEvent(Number(e.target.value))} />
                    </div>
                    <div className="dialogInput">
                        <h4>Título:</h4>
                        <TextBox placeholder="e.g.: Aula IoT/Setor/Prova Python" />
                    </div>
                    {event.eventType === "LESSON" &&
                         <>
                            <div className="dialogInput">
                                <h4>Participantes:</h4>
                                <div className="itemSelector">
                                    <DropdownList options={allPeople} selectedValue={selectedParticipant} onChange={(e) => setSelectedParticipant(Number(e.target.value))} />
                                    <button onClick={addParticipant} className="addItem">+</button>
                                </div>
                            </div>
                            <div className="participantsList">
                                {participants.map((participant) => (
                                    <div key={participant.value} className="listItem">
                                        <span className="itemName">{participant.label}</span>

                                        <button className="removeItem" onClick={() => removeParticipant(participant.value)}>×</button>
                                    </div>
                                ))}
                            </div>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(startDate)} onChange={(e) => setStartDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(endDate)} onChange={(e) => setEndDate(new Date(e.target.value))} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "500px" }}>
                                <h4>Frequência:</h4>
                                <FrequencySelector />
                            </div>
                        </>
                    }
                    {event.eventType === "EVENT" &&
                        <>
                            <div className="dialogInput">
                                <h4>Professor:</h4>
                                <DropdownList options={allInstructors} selectedValue={responsible} onChange={(e) => setResponsible(e.target.value)} />
                            </div>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" />
                            </div>
                            <div className="dialogInput">
                                <h4>Sala:</h4>
                                <DropdownList options={allRooms} selectedValue={selectedRoom} onChange={(e) => setSelectedRoom(Number(e.target.value))} />
                            </div>
                        </>
                    }
                    {event.eventType === "EXAM" &&
                        <>
                            <div className="dialogInput">
                                <h4>Professor:</h4>
                                <DropdownList options={allInstructors} selectedValue={responsible} onChange={(e) => setResponsible(e.target.value)} />
                            </div>
                            <div className="dialogInput">
                                <h4>Sala:</h4>
                                <DropdownList options={allRooms} selectedValue={selectedRoom} onChange={(e) => setSelectedRoom(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" />
                            </div>
                            <div className="dialogInput">
                                <h4>Turma:</h4>
                                <DropdownList options={allClasses} selectedValue={selectedClass} onChange={(e) => setSelectedClass(Number(e.target.value))} />
                            </div>
                        </>
                    }
                </div>
            }
            {type === "view-event" ? (
                <>
                    <div className="dialogContent" style={{ borderRadius: "10px" }}>
                        <div className="dialogInput">
                            <h4>Responsavel:</h4>
                            <h4>{event.responsible}</h4>
                        </div>
                        <div className="dialogInput">
                            <h4>Sala:</h4>
                            <h4>{event.responsible}</h4>
                        </div>
                        <div className="dialogInput">
                            <h4>Início:</h4>
                            <h4>{event.initial}</h4>
                        </div>
                        <div className="dialogInput">
                            <h4>Encerramento:</h4>
                            <h4>{event.end}</h4>
                        </div>
                        <div className="dialogInput">
                            <h4>Turma:</h4>
                            <h4>{event.class}</h4>
                        </div>
                    </div>
                    <div className="dialogButtons">
                        <BoschButton text="Editar" type="primary" onClick={() => setEvent()} />
                    </div>
                </>
            ) : (
                <div className="dialogButtons">
                    <BoschButton text="Confirmar" type="primary" onClick={create} />
                    <BoschButton text="Cancelar" type="secondary" onClick={onClose} />
                </div>)
            }
        </dialog>
    );
}

export default Dialog;
