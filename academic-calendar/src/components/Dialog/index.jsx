import { useEffect, useRef, useState } from "react";
import './index.css'
import BoschButton from "../BoschButton";
import TextBox from "../TextBox";
import DropdownList from "../DropdownList";
import FrequencySelector from "../FrequencySelector";
import { deleteData, getData, postData, putData } from "../../utils/apiBack";
import { toastError, toastSuccess, toastWarning } from '../../components/BoschToast';
import CadeadoTrancado from "../../images/cadeado-trancado.png"

function Dialog({ isOpen, onClose, type, setType, title, event = {}, subject }) {
    const dialogRef = useRef(null);

    const [responsible, setResponsible] = useState(null);
    const [allInstructors, setAllInstructors] = useState([]);
    const [subjectInstructors, setSubjectInstructors] = useState([]);
    const [allPeople, setAllPeople] = useState([]);

    const [studentClass, setStudentClass] = useState(null)
    const [selectedClass, setSelectedClass] = useState(null);
    const [allClasses, setAllClasses] = useState([]);

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [allRooms, setAllRooms] = useState([]);

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [allSubjects, setAllSubjects] = useState([]);

    const [typeEvent, setTypeEvent] = useState(1);
    const [eventName, setEventName] = useState("");
    const [selectedParticipant, setSelectedParticipant] = useState("");
    const [participants, setParticipants] = useState([]);

    const [newSubjectName, setNewSubjectName] = useState("")
    const [newSubjectWorkload, setNewSubjectWorkload] = useState("")

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [selectedDays, setSelectedDays] = useState([]);
    const [seriesName, setSeriesName] = useState("");

    const [typeStatusEvent, setTypeStatusEvent] = useState(
        event?.is_blocked === true ? 1 : 2);

    const [updatePage, setUpdatePage] = useState(false)
    const [description, setDescription] = useState(
        event !== null ? event.description : "");

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
        setDescription(event?.description ?? "");
    }, [event]);

    useEffect(() => {
        if (subject?.class_id) {
            setSelectedClass(subject.class_id);
            setSelectedSubject(subject.subject_id)
        }
    }, [subject]);

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
        getAllSubjects();
    }, [updatePage]);

    useEffect(() => {
        if (
            isOpen &&
            type === "view-event" &&
            event?.event_type === "FEEDBACK" || event?.event_type === "EXTERNAL"
        ) {
            getParticipants();
        }
    }, [isOpen, type, event?.event_type, event?.event_id]);

    useEffect(() => {
        if (selectedSubject) {
            getSubjectInstructors(selectedSubject);
        }
    }, [selectedSubject]);

    useEffect(() => {
        if (type === "planning" && subject?.subject_id) {
            getSubjectInstructors(subject.subject_id);
        }
    }, [type, subject]);

    const getAllRooms = async () => {
        try {
            const rooms = await getData("/room/all");

            const formattedRooms = rooms.map((room) => ({
                value: room.room_id,
                label: room.title
            }));

            setAllRooms(formattedRooms);

            if (formattedRooms.length > 0) {
                setSelectedRoom(formattedRooms[0].value);
            }
        } catch (error) {
            onClose();
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

            if (formatedClasses.length > 0) {
                setSelectedClass(
                    subject?.class_id ?? formatedClasses[0].value
                );
            }
        } catch (error) {
            onClose();
            toastError(`Erro: ${error.message}`);
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
            onClose();
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

            if (formatedInstructors.length > 0) {
                setResponsible(formatedInstructors[0].value);
            }
        } catch (error) {
            onClose();
            toastError(`Erro: ${error.message}`)
        }
    };

    const getAllSubjects = async () => {
        try {
            const data = await getData("/subject/all");

            const classCache = {};

            const subjectsWithClass = await Promise.all(
                data.map(async (subject) => {
                    if (!classCache[subject.class_id]) {
                        classCache[subject.class_id] =
                            await getData(`/class/${subject.class_id}`);
                    }

                    return {
                        value: subject.subject_id,
                        label: `${subject.name}`
                    };
                })
            );

            setAllSubjects(subjectsWithClass);
        } catch (error) {
            onClose();
            toastError(`Erro: ${error.message}`);
        }
    }

    const getSubjectInstructors = async (subjectId) => {
        if (!subjectId) return;

        try {
            const data = await getData(`/subject/instructors/${subjectId}`);

            const instructors = data.map(item => ({
                value: item.instructor.id,
                label: item.instructor.name
            }));

            setSubjectInstructors(instructors);

            if (instructors.length > 0) {
                setResponsible(instructors[0].value);
            } else {
                setResponsible(null);
            }

        } catch (error) {
            toastError(error.message);
        }
    };

    const getParticipants = async () => {
        try {
            const participantsEvent = await getData(
                `/event/participants/all/${event.event_id}`
            );

            setParticipants(participantsEvent.map(p => ({
                value: p.userId,
                label: p.userName
            })));

        } catch (err) {
            console.error(err);
        }
    }

    const create = async () => {
        try {
            let eventType = "";
            let edv;
            let user;
            let userId;
            let payload;
            let isInserted;
            let isUpdated;
            let isBlocked;
            let eventId;
            let subjectInstructor;

            switch (type) {
                case "event": {
                    switch (typeEvent) {
                        case 1:
                            if (!eventName.trim()) {
                                onClose();
                                toastWarning("O título é obrigatório.");
                                return;
                            }

                            if (!startDate || !endDate) {
                                onClose();
                                toastWarning("O horário de início e encerramento é obrigatório.");
                                return;
                            }

                            eventType = "EXTERNAL";

                            edv = sessionStorage.getItem("user");
                            user = await getData(`/user/edv/${edv}`);
                            userId = user.user.id;

                            if (participants.length <= 0) {
                                onClose();
                                toastError("Adicione um ou mais participantes.");
                                return;
                            }

                            payload = {
                                description:  description,
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

                            try {
                                for (const p of participants) {
                                    const participantPayload = {
                                        userId: p.value,
                                        eventId
                                    };

                                    await postData("/event/participants", participantPayload);
                                }

                                onClose();
                                toastSuccess("Evento criado com sucesso!");
                            } catch (error) {
                                console.log("Entrou no catch", error);

                                await deleteData(`/event/${eventId}`);

                                if (error.message.includes("another confirmed event")) {
                                    onClose();
                                    toastError("Um dos participantes já possui outro evento nesse horário.");
                                } else {
                                    onClose();
                                    toastError(error.message);
                                }
                            }
                            break;
                        case 2:
                            if (!eventName.trim()) {
                                onClose();
                                toastWarning("O título é obrigatório.");
                                return;
                            }

                            if (!startDate || !endDate) {
                                onClose();
                                toastWarning("O horário de início e encerramento é obrigatório.");
                                return;
                            }

                            if (!selectedRoom || !responsible || !selectedSubject) {
                                onClose();
                                toastWarning("A sala, professor e matéria são obrigatórios.");
                                return;
                            }

                            eventType = "LESSON";

                            edv = sessionStorage.getItem("user");
                            user = await getData(`/user/edv/${edv}`);
                            userId = user.user.id;

                            subjectInstructor = await getData(`/subject/${selectedSubject}/instructor/${responsible}`)

                            if (!subjectInstructor) {
                                onClose();
                                toastWarning("O instrutor não está associado com a matéria.");
                                return;
                            }

                            payload = {
                                description:  description,
                                title: eventName,
                                eventType: eventType,
                                startDate: startDate,
                                endDate: endDate,
                                createdBy: userId,
                                roomId: selectedRoom,
                                subjectInstructorId: subjectInstructor.subject_instructor_id
                            };

                            isInserted = await postData("/event/", payload);

                            if (!isInserted) {
                                onClose();
                                toastError("Falha ao criar aula.");
                                return;
                            }

                            eventId = isInserted.event_id;

                            onClose();
                            toastSuccess("Aula criada com sucesso!");
                            break;
                        case 3:
                            if (!eventName.trim()) {
                                onClose();
                                toastWarning("O título é obrigatório.");
                                return;
                            }

                            if (!startDate || !endDate) {
                                onClose();
                                toastWarning("O horário de início e encerramento é obrigatório.");
                                return;
                            }

                            if (!selectedRoom || !responsible || !selectedSubject) {
                                onClose();
                                toastWarning("A sala, professor e matéria são obrigatórios.");
                                return;
                            }

                            eventType = "ASSESSMENT";

                            edv = sessionStorage.getItem("user");
                            user = await getData(`/user/edv/${edv}`);
                            userId = user.user.id;

                            subjectInstructor = await getData(`/subject/${selectedSubject}/instructor/${responsible}`)

                            if (!subjectInstructor) {
                                onClose();
                                toastWarning("O instrutor não está associado com a matéria.");
                                return;
                            }

                            payload = {
                                description:  description,
                                title: eventName,
                                eventType: eventType,
                                startDate: startDate,
                                endDate: endDate,
                                createdBy: userId,
                                roomId: selectedRoom,
                                subjectInstructorId: subjectInstructor.subject_instructor_id
                            };

                            isInserted = await postData("/event/", payload);

                            if (!isInserted) {
                                onClose();
                                toastError("Falha ao criar avaliação.");
                                return;
                            }

                            eventId = isInserted.event_id;

                            onClose();
                            toastSuccess("Avaliação criada com sucesso!");
                            break;
                        case 4:
                            if (!eventName.trim()) {
                                onClose();
                                toastWarning("O título é obrigatório.");
                                return;
                            }

                            if (!startDate || !endDate) {
                                onClose();
                                toastWarning("O horário de início e encerramento é obrigatório.");
                                return;
                            }

                            eventType = "FEEDBACK";

                            edv = sessionStorage.getItem("user");
                            user = await getData(`/user/edv/${edv}`);
                            userId = user.user.id;

                            if (participants.length <= 0) {
                                onClose();
                                toastError("Adicione um ou mais participantes.");
                                return;
                            }

                            payload = {
                                description:  description,
                                title: eventName,
                                eventType: eventType,
                                startDate: startDate,
                                endDate: endDate,
                                createdBy: userId
                            };

                            isInserted = await postData("/event/", payload);

                            if (!isInserted) {
                                onClose();
                                toastError("Falha ao criar feedback.");
                                return;
                            }

                            eventId = isInserted.event_id;

                            try {
                                for (const p of participants) {
                                    const participantPayload = {
                                        userId: p.value,
                                        eventId
                                    };

                                    await postData("/event/participants", participantPayload);
                                }

                                onClose();
                                toastSuccess("Feedback criado com sucesso!");
                            } catch (error) {
                                console.log("Entrou no catch", error);

                                await deleteData(`/event/${eventId}`);

                                if (error.message.includes("another confirmed event")) {
                                    onClose();
                                    toastError("Um dos participantes já possui outro evento nesse horário.");
                                } else {
                                    onClose();
                                    toastError(error.message);
                                }
                            }
                            break;
                    }
                    break;
                }
                case "subject": {
                    edv = sessionStorage.getItem("user");
                    user = await getData(`/user/edv/${edv}`);
                    userId = user.user.id;

                    if (!newSubjectName.trim()) {
                        onClose();
                        toastWarning("O nome da matéria é obrigatório.");
                        return;
                    }

                    if (!newSubjectWorkload) {
                        onClose();
                        toastWarning("A carga horária é obrigatória.");
                        return;
                    }

                    const workload = Number(newSubjectWorkload);

                    if (!Number.isInteger(workload) || workload <= 0 || workload % 4 != 0) {
                        onClose();
                        toastWarning("Digite uma carga horária válida.");
                        return;
                    }

                    const classItem = await getData(`/class/${selectedClass}`);

                    if (!classItem) {
                        onClose();
                        toastWarning("Erro ao obter informações da turma.");
                        return;
                    }

                    const className = classItem.name;

                    const newSubject = {
                        name: className + " - " + newSubjectName,
                        workload: parseInt(newSubjectWorkload),
                        startDate: startDate,
                        classId: selectedClass,
                        completedWorkload: 0
                    }

                    const isInserted = await postData("/subject", newSubject);

                    if (!isInserted) {
                        onClose();
                        toastError("Falha ao criar matéria.");
                        return;
                    }

                    const subjectId = isInserted.subject_id;

                    const newSubjectInstructor = {
                        "subjectId": subjectId,
                        "instructorId": userId
                    }

                    const subjectInstructorAdded = await postData("/subject/instructor/", newSubjectInstructor);

                    if (!subjectInstructorAdded) {
                        onClose();
                        toastError("Falha ao lhe associar a matéria criada.");
                        return;
                    }

                    onClose();
                    toastSuccess("Matéria criada com sucesso.")
                    break;
                }
                case "planning":
                    edv = sessionStorage.getItem("user");
                    user = await getData(`/user/edv/${edv}`);
                    userId = user.user.id;

                    const occurrences = Math.ceil(subject.workload / 4);

                    const daysNames = [
                        "Segunda",
                        "Terça",
                        "Quarta",
                        "Quinta",
                        "Sexta"
                    ];

                    const selectedNames = selectedDays.map(
                        day => daysNames[day]
                    );

                    if (!startDate || !startTime || !endTime) {
                        onClose();
                        toastWarning("A data e horário são campos obrigatórios.");
                        return;
                    }

                    if (!selectedRoom || !responsible || !selectedClass) {
                        onClose();
                        toastWarning("A sala, professor e matéria são obrigatórios.");
                        return;
                    }

                    if (selectedDays.length <= 0) {
                        onClose();
                        toastWarning("Selecione a frequência das aulas.");
                        return;
                    }

                    subjectInstructor = await getData(`/subject/${subject.subject_id}/instructor/${responsible}`)

                    payload = {
                        description:  description,
                        title: subject.name,
                        startDate: startDate,
                        startHour: startTime,
                        endHour: endTime,
                        createdBy: userId,
                        subjectInstructorId: Number(subjectInstructor.subject_instructor_id),
                        roomId: Number(selectedRoom),
                        classId: Number(selectedClass),
                        recurrence: {
                            seriesName: seriesName || `${subject.name} - ${selectedNames.join(" e ")}`,
                            occurrences,
                            monday: selectedDays.includes(0),
                            tuesday: selectedDays.includes(1),
                            wednesday: selectedDays.includes(2),
                            thursday: selectedDays.includes(3),
                            friday: selectedDays.includes(4)
                        }
                    }

                    const schedulePlanned = await postData('/scheduler/lessons', payload);

                    if (!schedulePlanned) {
                        onClose();
                        toastError("Falha ao planejar as aulas.");
                        return;
                    }

                    setUpdatePage(!updatePage)

                    onClose();
                    toastSuccess("Aulas planejadas com sucesso!")
                    break;
                case "instructor":
                    payload = {
                        subjectId: subject.subject_id,
                        instructorId: responsible
                    }

                    const instructorAdded = await postData('/subject/instructor', payload);

                    if (!instructorAdded) {
                        onClose();
                        toastError("Falha ao adicionar instrutor à aula.");
                        return;
                    }

                    onClose();
                    toastSuccess("Instrutor adicionado com sucesso!")
                    break;
                case "edit-event": {
                    switch (typeEvent) {
                        case 1:
                            if (!eventName.trim()) {
                                onClose();
                                toastWarning("O título é obrigatório.");
                                return;
                            }

                            eventType = "EXTERNAL";

                            edv = sessionStorage.getItem("user");
                            user = await getData(`/user/edv/${edv}`);
                            userId = user.user.id;

                            payload = {
                                description:  description,
                                title: eventName,
                                eventType: eventType,
                                startDate: startDate,
                                endDate: endDate,
                                createdBy: userId,
                            };

                            isUpdated = await putData(`/event/${event.event_id}`, payload);

                            if (!isUpdated) {
                                onClose();
                                toastError("Falha ao atualizar evento.");
                                return;
                            }
                            if (typeStatusEvent === 1) {
                                await putData(`/event/block/${event.event_id}`)
                            }
                            else {
                                await putData(`/event/unblock/${event.event_id}`)
                            }

                            eventId = isUpdated.event_id;

                            onClose();

                            setUpdatePage(!updatePage)
                            toastSuccess("Evento atualizado com sucesso!");
                            break;
                        case 2:
                            if (!eventName.trim()) {
                                onClose();
                                toastWarning("O título é obrigatório.");
                                return;
                            }

                            eventType = "LESSON";

                            edv = sessionStorage.getItem("user");
                            user = await getData(`/user/edv/${edv}`);
                            userId = user.user.id;

                            subjectInstructor = await getData(`/subject/${subject.subject_id}/instructor/${responsible}`)

                            payload = {
                                description:  description,
                                title: eventName,
                                eventType: eventType,
                                startDate: startDate,
                                subjectInstructorId: subjectInstructor.subject_instructor_id,
                                createdBy: userId,
                                roomId: selectedRoom,
                                startDate: startDate
                            };

                            isUpdated = await putData(`/event/${event.event_id}`, payload);

                            if (!isUpdated) {
                                onClose();
                                toastError("Falha ao criar evento.");
                                return;
                            }

                            eventId = isUpdated.event_id;

                            onClose();
                            toastSuccess("Aulas atualizadas com sucesso!");
                            break;
                        case 3:
                            if (!eventName.trim()) {
                                onClose();
                                toastWarning("O título é obrigatório.");
                                return;
                            }

                            if (!startDate || !endDate) {
                                onClose();
                                toastWarning("O horário de início e encerramento é obrigatório.");
                                return;
                            }

                            eventType = "ASSESSMENT";

                            edv = sessionStorage.getItem("user");
                            user = await getData(`/user/edv/${edv}`);
                            userId = user.user.id;

                            subjectInstructor = await getData(`/subject/${subject.subject_id}/instructor/${responsible}`)

                            payload = {
                                description:  description,
                                title: eventName,
                                eventType: eventType,
                                startDate: startDate,
                                endDate: endDate,
                                createdBy: userId,
                                roomId: selectedRoom,
                                subjectInstructorId: subjectInstructor.subject_instructor_id
                            };

                            isUpdated = await putData(
                                `/event/${event.event_id}`,
                                payload
                            );

                            if (!isUpdated) {
                                onClose();
                                toastError("Falha ao atualizar avaliação.");
                                return;
                            }

                            onClose();
                            toastSuccess("Avaliação atualizada com sucesso!");
                            break;
                    }
                    break;
                }
            }
        } catch (error) {
            onClose();
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

    const deleteEvent = async () => {
        try {
            await putData(`/event/cancel/${event.event_id}`);

            onClose();
            toastSuccess("Evento deletado.");
            setUpdatePage(!updatePage);

        } catch (e) {
            if (e.response?.status === 401) {
                onClose();
                toastError("Você não tem permissão para deletar esse evento");
            } else {
                toastError("Erro ao deletar o evento.");
            }
        }
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

    const formatDateTimeLocal = (date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return "";
        }

        return new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
        )
            .toISOString()
            .slice(0, 16);
    };

    const setEvent = async () => {
        setType("edit-event");
        console.log(event)

        if (event.eventType === "LESSON") {
            setTypeEvent(1);
        } else if (event.eventType === "EXTERNAL") {
            setTypeEvent(2);
        } else if (event.eventType === "ASSESSMENT") {
            setTypeEvent(3);
        }

        setEventName(event.title);
        setStartDate(new Date(event.start_date));
        setEndDate(new Date(event.end_date));
    }

    const unblockEvent = async () => {
        await putData(`/event/unblock/${event.event_id}`);

        onClose();
        toastSuccess("Evento desbloqueado.");
    }

    const confirmLesson = async () => {
        try {
            await putData(`/event/confirm/${event.event_id}`);

            onClose();
            toastSuccess("Aula confirmada.");

        } catch (e) {
            onClose()
            if (e.message === "Event has already ended") {
                toastError("O evento já terminou.");
            }
            else {
                toastError("Não foi possivel confirmar a aula.");
            }

        }
    }

    const typeEvents = [
        { value: 1, label: "Evento" },
        { value: 2, label: "Aula" },
        { value: 3, label: "Avaliação" },
        { value: 4, label: "Feedback" }
    ];

    const typeStatus = [
        { value: 1, label: "Bloqueado" },
        { value: 2, label: "Desbloqueado" }
    ];

    return (
        <dialog ref={dialogRef} className="customDialog">
            <div className="dialogHeader">
                <h2 style={{ display: "flex", gap: ".5rem" }}>
                    <>
                        {event != null && event.is_blocked &&
                            <img src={CadeadoTrancado} alt="bloqueado" style={{ height: "1.5rem" }} />
                        }
                    </>
                    {title}
                </h2>
                <button onClick={onClose} className="closeButton">x</button>
            </div>
            {type === "planning" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Nome da série:</h4>
                        <TextBox
                            type="text"
                            value={seriesName}
                            onChange={(e) => setSeriesName(e.target.value)}
                        />
                    </div>
                    <div className="dialogInput">
                        <h4>Data de Início:</h4>
                        <TextBox
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="dialogInput">
                        <h4>Início:</h4>
                        <TextBox
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                    <div className="dialogInput">
                        <h4>Fim:</h4>
                        <TextBox
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                    <div className="dialogInput">
                        <h4>Professor:</h4>
                        <div className="itemSelector">
                            <DropdownList options={subjectInstructors} selectedValue={responsible} onChange={(e) => setResponsible(Number(e.target.value))} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <h4>Frequência:</h4>
                        <FrequencySelector
                            value={selectedDays}
                            onChange={(value) => setSelectedDays(value)}
                        />
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
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <TextBox placeholder="decrição" type="text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </>
                    }
                    {typeEvent === 2 &&
                        <>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(startDate)} onChange={(e) => setStartDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(endDate)} onChange={(e) => setEndDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Professor:</h4>
                                <DropdownList options={subjectInstructors} selectedValue={responsible} onChange={(e) => setResponsible(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Sala:</h4>
                                <DropdownList options={allRooms} selectedValue={selectedRoom} onChange={(e) => setSelectedRoom(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Matéria:</h4>
                                <DropdownList options={allSubjects} selectedValue={selectedSubject} onChange={(e) => setSelectedSubject(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <TextBox placeholder="decrição" type="text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </>
                    }
                    {typeEvent === 3 &&
                        <>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(startDate)} onChange={(e) => setStartDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(endDate)} onChange={(e) => setEndDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Professor:</h4>
                                <DropdownList options={subjectInstructors} selectedValue={responsible} onChange={(e) => setResponsible(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Sala:</h4>
                                <DropdownList options={allRooms} selectedValue={selectedRoom} onChange={(e) => setSelectedRoom(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Matéria:</h4>
                                <DropdownList options={allSubjects} selectedValue={selectedSubject} onChange={(e) => setSelectedSubject(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <TextBox placeholder="decrição" type="text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </>
                    }
                    {typeEvent === 4 &&
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
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <TextBox placeholder="decrição" type="text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
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
            {type === "instructor" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Instrutor:</h4>
                        <div className="itemSelector">
                            <DropdownList options={allInstructors} selectedValue={responsible} onChange={(e) => setResponsible(Number(e.target.value))} />
                        </div>
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
                        <TextBox placeholder="e.g.: Aula IoT/Setor/Prova Python" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    </div>
                    {typeEvent === 1 &&
                        <>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(startDate)} onChange={(e) => setStartDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <TextBox placeholder="XX/XX/XXXX XX:XX" type="datetime-local" value={formatDateTimeLocal(endDate)} onChange={(e) => setEndDate(new Date(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Status Evento:</h4>
                                <DropdownList options={typeStatus} selectedValue={typeStatusEvent} onChange={(e) => setTypeStatusEvent(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <TextBox placeholder="decrição" type="text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
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
                            <div className="dialogInput">
                                <h4>Status Evento:</h4>
                                <DropdownList options={typeStatus} selectedValue={typeStatusEvent} onChange={(e) => setTypeStatusEvent(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <TextBox placeholder="decrição" type="text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
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
                            <div className="dialogInput">
                                <h4>Status Evento:</h4>
                                <DropdownList options={typeStatus} selectedValue={typeStatusEvent} onChange={(e) => setTypeStatusEvent(Number(e.target.value))} />
                            </div>
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <TextBox placeholder="decrição" type="text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </>
                    }
                </div>
            }
            {type === "view-event" ? (
                <>
                    {event.event_type === "LESSON" &&
                        <div className="dialogContent" style={{ borderRadius: "10px" }}>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <h4>{new Date(event.start_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", })}</h4>
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <h4>{new Date(event.end_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", })}</h4>
                            </div>
                            <div className="dialogInput">
                                <h4>Turma:</h4>
                                <div className="participantsList">
                                    <div className="listItem">
                                        <span className="itemName" style={{ justifyContent: "center" }}>{event.class.name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dialogInput">
                                <h4>Instrutor:</h4>
                                <div className="participantsList">
                                    <div className="listItem">
                                        <span className="itemName" style={{ justifyContent: "center" }}>{event.subject_instructor?.instructor?.name ?? "Não informado"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dialogInput">
                                <h4>Salas:</h4>
                                <div className="participantsList">
                                    <div className="listItem">
                                        <span className="itemName" style={{ justifyContent: "center" }}>{event.reservation?.room?.title ?? "Não informada"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <h4>{event.description}</h4>
                            </div> 
                        </div>
                    }
                    {event.event_type === "EXTERNAL" &&
                        <div className="dialogContent" style={{ borderRadius: "10px" }}>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <h4>{new Date(event.start_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", })}</h4>
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <h4>{new Date(event.end_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", })}</h4>
                            </div>
                            <div className="dialogInput">
                                <h4>Participantes:</h4>
                                <div className="participantsList">
                                    {participants.map((participant) => (
                                        <div className="listItem">
                                            <span className="itemName">{participant.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <h4>{description}</h4>
                            </div> 
                        </div>
                    }
                    {event.event_type === "FEEDBACK" &&
                        <div className="dialogContent" style={{ borderRadius: "10px" }}>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <h4>{new Date(event.start_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", })}</h4>
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <h4>{new Date(event.end_date).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", })}</h4>
                            </div>
                            <div className="dialogInput">
                                <h4>Participantes:</h4>
                                <div className="participantsList">
                                    {participants.map((participant) => (
                                        <div key={participant.value} className="listItem">
                                            <span className="itemName">{participant.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="dialogInput">
                                <h4>Salas:</h4>
                                <div className="participantsList">
                                    <div className="listItem">
                                        <span className="itemName" style={{ justifyContent: "center" }}>{event.reservation?.room?.title ?? "Não informada"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <h4>{description}</h4>
                            </div> 
                        </div>
                    }
                    {event.event_type === "ASSESSMENT" &&
                        <div className="dialogContent" style={{ borderRadius: "10px" }}>
                            <div className="dialogInput">
                                <h4>Início:</h4>
                                <h4>
                                    {new Date(event.start_date).toLocaleString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </h4>
                            </div>
                            <div className="dialogInput">
                                <h4>Encerramento:</h4>
                                <h4>
                                    {new Date(event.end_date).toLocaleString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </h4>
                            </div>
                            <div className="dialogInput">
                                <h4>Salas:</h4>
                                <div className="participantsList">
                                    <div className="listItem">
                                        <span className="itemName" style={{ justifyContent: "center" }}>{event.reservation?.room?.title ?? "Não informada"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dialogInput">
                                <h4>Descrição:</h4>
                                <h4>{description}</h4>
                            </div> 
                        </div>
                    }
                    <div className="dialogButtons">
                        {event.event_type === "LESSON" && event.status === "SCHEDULED" ? (
                            <>
                                <BoschButton text="Deletar" type="delete" onClick={() => deleteEvent()} />
                                <BoschButton text="Confirmar Aula" type="primary" onClick={() => confirmLesson()} />
                            </>
                        ) : (
                            <>
                                {!event.is_blocked && (
                                    <>
                                        <BoschButton text="Deletar" type="delete" onClick={() => deleteEvent()} />
                                        <BoschButton text="Editar" type="primary" onClick={() => setEvent()} />
                                    </>
                                )}
                                {event.is_blocked && (
                                    <BoschButton text="Desbloquear" type="primary" onClick={() => unblockEvent()} />
                                )}
                            </>
                        )
                        }

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
