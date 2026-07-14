import { useEffect, useRef, useState } from "react";
import './index.css'
import BoschButton from "../BoschButton";
import TextBox from "../TextBox";
import DropdownList from "../DropdownList";
import ColorPicker from "../ColorPicker";
import FrequencySelector from "../FrequencySelector";
import { toastError } from "../BoschToast";

function Dialog({ isOpen, onClose, type, title, onSave }) {
    const dialogRef = useRef(null);
    const [errors, setErrors] = useState({});

    const [responsible, setResponsible] = useState(null);
    const [classs, setClasss] = useState(null);

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);

    const [typeEvent, setTypeEvent] = useState(null);
    const [selectedParticipant, setSelectedParticipant] = useState("");
    const [participants, setParticipants] = useState([]);

    const [subjectName, setSubjectName] = useState("");
    const [workload, setWorkload] = useState("");
    const [studentName, setStudentName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [edv, setEdv] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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

    const addRoom = () => {
        if (!selectedRoom) return;

        const room = salasMock.find(room => room.value === selectedRoom);

        if (!room) return;

        if (rooms.some(r => r.value === room.value)) return;

        setRooms([
            ...rooms,
            {
                ...room,
                isMain: rooms.length === 0
            }
        ]);

        setSelectedRoom("");
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

        const participant = usersMock.find(
            user => user.value === selectedParticipant
        );

        if (!participant) return;

        if (participants.some(p => p.value === participant.value)) return;

        setParticipants([...participants, participant]);
        setSelectedParticipant("");
    };

    const removeParticipant = (id) => {
        setParticipants(participants.filter(p => p.value !== id));
    };

    const validateForm = () => {
        const newErrors = {};

        if (type === "subject") {
            if (!subjectName.trim()) {
                onClose();
                toastError("Nome da matéria é obrigatório");
            }
            if (!responsible) {
                onClose();
                toastError("Responsável é obrigatório");
            }
            if (!workload.trim()) {
                onClose();
                toastError("Carga horária é obrigatória");
            }
            if (rooms.length === 0) {
                onClose();
                toastError("Selecione pelo menos uma sala");
            }
        }

        if (type === "student") {
            if (!studentName.trim()) {
                onClose();
                toastError("Nome do aluno é obrigatório");
            }
            if (!classs) {
                onClose();
                toastError("Turma é obrigatória");
            }
            if (!birthDate.trim()) {
                onClose();
                toastError("Data de nascimento é obrigatória");
            }
            if (!edv.trim()) {
                onClose();
                toastError("EDV é obrigatório");
            }
        }


        if (type === "event") {
            if (!typeEvent) {
                onClose();
                toastError("Tipo de evento é obrigatório.");
            }
            if (!eventTitle.trim()) {
                onClose();
                toastError("Título do evento é obrigatório.");
            }


            if (typeEvent === 1) {
                if (participants.length === 0) {
                    onClose();
                    toastError("Adicione pelo menos um participante");
                }
                if (!startDate.trim()) {
                    onClose();
                    toastError("Data de início obrigatória");
                }
                if (!endDate.trim()) {
                    onClose();
                    toastError("Data de encerramento obrigatória");
                }
            }


            if (typeEvent === 2) {
                if (!responsible) {
                    onClose();
                    toastError("Professor obrigatório");
                }
                if (!startDate.trim()) {
                    onClose();
                    toastError("Data de início obrigatória");
                }
                if (!endDate.trim()) {
                    onClose();
                    toastError("Data de encerramento obrigatória");
                }
                if (!selectedRoom) {
                    onClose();
                    toastError("Sala obrigatória");
                }
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const usersMock = [
        { value: 1, label: "Fabio Silveira" },
        { value: 2, label: "Queila Lima" },
        { value: 3, label: "Rebeca Ianz" },
        { value: 4, label: "Patrick Pereira" },
        { value: 5, label: "Gabriel Bernadelli" },
    ];

    const salasMock = [
        { value: 1, label: "Sala Digital" },
        { value: 2, label: "Fábrica" },
        { value: 3, label: "Sala Fábio" },
        { value: 4, label: "Sala Fedida" },
        { value: 5, label: "War Room" },
    ];

    const turmasMock = [
        { value: 1, label: "MEC25" },
        { value: 2, label: "DTA3" },
        { value: 3, label: "MEC26" },
        { value: 4, label: "ADD2" },
        { value: 5, label: "MAN25" },
    ];

    const typeEvents = [
        { value: 1, label: "Evento" },
        { value: 2, label: "Aula" },
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
                        <TextBox
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            placeholder="e.g.: Internet das Coisas"
                        />
                    </div>
                    <div className="dialogInput">
                        <h4>Responsável:</h4>
                        <DropdownList options={usersMock} selectedValue={responsible} onChange={(e) => setResponsible(e.target.value)} />
                    </div>
                    <div className="dialogInput">
                        <h4>Carga horária:</h4>
                        <TextBox
                            value={workload}
                            onChange={(e) => setWorkload(e.target.value)}
                            placeholder="e.g.: 16h"
                        />
                    </div>
                    <div className="dialogInput">
                        <h4>Salas:</h4>
                        <div className="itemSelector">
                            <DropdownList options={salasMock} selectedValue={selectedRoom} onChange={(e) => setSelectedRoom(Number(e.target.value))} />
                            <button onClick={addRoom} className="addItem">+</button>
                        </div>
                    </div>
                    <div className="dialogInput">
                        <h4>Cor:</h4>
                        <ColorPicker />
                    </div>
                    <div className="roomsList">
                        {rooms.map((room) => (
                            <div key={room.value} className={`listItem ${room.isMain ? "mainRoom" : ""}`}>
                                <span className="itemName">{room.isMain && "⭐ "}{room.label}</span>

                                <button className="removeItem" onClick={() => removeRoom(room.value)}>×</button>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: "500px" }}>
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
                        <TextBox value={eventTitle} placeholder="e.g.: Aula IoT/Setor/Prova Python" onChange={(e) => setEventTitle(e.target.value)} />
                    </div>
                    {typeEvent === 1 &&
                        <>
                            <div className="dialogInput">
                                <h4>Participantes:</h4>
                                <div className="itemSelector">
                                    <DropdownList options={usersMock} selectedValue={selectedParticipant} onChange={(e) => setSelectedParticipant(Number(e.target.value))} />
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
                                <TextBox placeholder="XX/XX/XXXX XX:XX" />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", width: "500px" }}>
                                <h4>Frequência:</h4>
                                <FrequencySelector />
                            </div>
                            <div className="dialogInput" style={{ marginLeft: "3rem" }}>
                                <h4>Cor:</h4>
                                <ColorPicker />
                            </div>
                        </>
                    }
                    {typeEvent === 2 &&
                        <>
                            <div className="dialogInput">
                                <h4>Professor:</h4>
                                <DropdownList options={usersMock} selectedValue={responsible} onChange={(e) => setResponsible(Number(e.target.value))} />
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
                                <DropdownList options={salasMock} selectedValue={selectedRoom} onChange={(e) => setRoom(e.target.value)} />
                            </div>
                        </>
                    }
                </div>
            }
            {type === "student" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Nome do aluno:</h4>
                        <TextBox
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="e.g.: João Silveira"
                        />
                    </div>
                    <div className="dialogInput">
                        <h4>Turma:</h4>
                        <DropdownList options={turmasMock} selectedValue={classs} onChange={(e) => setClasss(e.target.value)} />
                    </div>
                    <div className="dialogInput">
                        <h4>Data de nascimento:</h4>
                        <TextBox
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            placeholder="XX/XX/XXXX"
                        />
                    </div>
                    <div className="dialogInput">
                        <h4>EDV:</h4>
                        <TextBox
                            value={edv}
                            onChange={(e) => setEdv(e.target.value)}
                            placeholder="e.g.: 9290XXXX"
                        />
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
            <div className="dialogButtons">
                <BoschButton text="Confirmar" type="primary" onClick={() => {
                    if (validateForm()) {
                        onSave();
                    }
                }} />
                <BoschButton text="Cancelar" type="secondary" onClick={onClose} />
            </div>
        </dialog>
    );
}

export default Dialog;
