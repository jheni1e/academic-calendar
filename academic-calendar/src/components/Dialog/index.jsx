import { useEffect, useRef, useState } from "react";
import './index.css'
import BoschButton from "../BoschButton";
import TextBox from "../TextBox";
import DropdownList from "../DropdownList";
import ColorPicker from "../ColorPicker";
import FrequencySelector from "../FrequencySelector";

function Dialog({ isOpen, onClose, type, title }) {
    const dialogRef = useRef(null);
    const [responsible, setResponsible] = useState(null);
    const [room, setRoom] = useState(null);
    const [classs, setClasss] = useState(null);

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

    const usersMock = [
        { value: 1, label: "Fabio Silveira" },
        { value: 2, label: "Queila Lima" },
        { value: 3, label: "Rebeca Ianz" },
        { value: 4, label: "Patrick Pereira" },
        { value: 5, label: "Gabriel Bernadelli" },
    ];

    const salasMock = [
        { value: 1, label: "Sala Digital 1" },
        { value: 2, label: "Sala Digital 2" },
        { value: 3, label: "Sala de Aula" },
        { value: 4, label: "Outro" },
    ];

    const turmasMock = [
        { value: 1, label: "MEC25" },
        { value: 2, label: "DTA3" },
        { value: 3, label: "MEC26" },
        { value: 4, label: "ADD2" },
        { value: 5, label: "MAN25" },
    ];

    return (
        <dialog ref={dialogRef} className="customDialog">
            <div className="dialogHeader">
                <h2>{title}</h2>
                <button onClick={onClose} className="closeButton">x</button>
            </div>
            {type === "subject" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Nome da matéria:</h4>
                        <TextBox placeholder="e.g.: Internet das Coisas" style={{ width: '320px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Responsável:</h4>
                        <DropdownList options={usersMock} selectedValue={responsible} onChange={(e) => setResponsible(e.target.value)} />
                    </div>
                    <div className="dialogInput">
                        <h4>Início:</h4>
                        <TextBox placeholder="XX/XX/XXXX XX:XX" style={{ width: '152px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Encerramento:</h4>
                        <TextBox placeholder="XX/XX/XXXX XX:XX" style={{ width: '152px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Carga horária:</h4>
                        <TextBox placeholder="e.g.: 16h" style={{ width: '132px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Cor:</h4>
                        <ColorPicker />
                    </div>
                    <div className="dialogInput" style={{ marginRight: "2.5rem" }}>
                        <h4>Salas:</h4>
                        <DropdownList options={salasMock} selectedValue={room} onChange={(e) => setRoom(e.target.value)} />
                        { room === "4" &&
                            <TextBox placeholder="e.g.: Oficina" style={{ width: '100%'}}></TextBox> 
                        }
                    </div>
                    <div className="dialogInput">
                        <h4>Frequência:</h4>
                        <FrequencySelector />
                    </div>
                </div>
            }
            {type === "event" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Nome do evento:</h4>
                        <TextBox placeholder="e.g.: Apresentação do subsolo Bosch" style={{ width: '320px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Participantes:</h4>
                        <DropdownList options={usersMock} selectedValue={responsible} onChange={(e) => setResponsible(e.target.value)} />
                    </div>
                    <div className="dialogInput">
                        <h4>Início:</h4>
                        <TextBox placeholder="XX/XX/XXXX XX:XX" style={{ width: '152px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Encerramento:</h4>
                        <TextBox placeholder="XX/XX/XXXX XX:XX" style={{ width: '152px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Cor:</h4>
                        <ColorPicker />
                    </div>
                    <div className="dialogInput">
                        <h4>Frequência:</h4>
                        <FrequencySelector />
                    </div>
                </div>
            }
            {type === "class" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Nome da aula:</h4>
                        <TextBox placeholder="e.g.: Projeto Fullstack" style={{ width: '320px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Professor:</h4>
                        <DropdownList options={usersMock} selectedValue={responsible} onChange={(e) => setResponsible(e.target.value)} />
                    </div>
                    <div className="dialogInput">
                        <h4>Início:</h4>
                        <TextBox placeholder="XX/XX/XXXX XX:XX" style={{ width: '152px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Encerramento:</h4>
                        <TextBox placeholder="XX/XX/XXXX XX:XX" style={{ width: '152px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Salas:</h4>
                        <DropdownList options={salasMock} selectedValue={room} onChange={(e) => setRoom(e.target.value)} />
                        { room === "4" &&
                            <TextBox placeholder="e.g.: Oficina"></TextBox> 
                        }
                    </div>
                </div>
            }
            {type === "student" &&
                <div className="dialogContent">
                    <div className="dialogInput">
                        <h4>Nome do aluno:</h4>
                        <TextBox placeholder="e.g.: João Silveira" style={{ width: '320px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Turma:</h4>
                        <DropdownList options={turmasMock} selectedValue={classs} onChange={(e) => setClasss(e.target.value)} />
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
                        <TextBox placeholder="XX/XX/XXXX XX:XX" style={{ width: '152px' }} />
                    </div>
                    <div className="dialogInput">
                        <h4>Encerramento:</h4>
                        <TextBox placeholder="XX/XX/XXXX XX:XX" style={{ width: '152px' }} />
                    </div>
                </div>
            }
            <div className="dialogButtons">
                <BoschButton text="Confirmar" type="primary" />
                <BoschButton text="Cancelar" type="secondary" onClick={onClose} />
            </div>
        </dialog>
    );
}

export default Dialog;
