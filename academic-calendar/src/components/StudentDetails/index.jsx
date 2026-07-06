import { useEffect, useRef, useState } from "react";
import './index.css'
import BoschButton from "../BoschButton";
import TextBox from "../TextBox";
import DropdownList from "../DropdownList";
import ColorPicker from "../ColorPicker";
import FrequencySelector from "../FrequencySelector";
import CircleChartItem from "../CircleChartItem";

function StudentDetails({ isOpen, onClose, student }) {
    const detailsRef = useRef(null);
    const color1 = "#19375E";
    const color2 = "#007BC0";

    useEffect(() => {
        const details = detailsRef.current;
        if (!details) return;

        if (isOpen && !details.open) {
            details.showModal();
        }

        if (!isOpen && details.open) {
            details.close();
        }
    }, [isOpen]);

    useEffect(() => {
        const details = detailsRef.current;
        if (!details) return;

        const handleCancel = (event) => {
            event.preventDefault();
            onClose();
        };

        details.addEventListener("cancel", handleCancel);
        return () => details.removeEventListener("cancel", handleCancel);
    }, [onClose]);

    return (
        <dialog ref={detailsRef} className="customDialog">
            <div className="dialogHeader">
                <h2>Detalhes do Aluno</h2>
                <button onClick={onClose} className="closeButton">x</button>
            </div>
            <div className="dialogContent">
                <div className="studentInfo">
                    <div className="dialogInput">
                        <span className="title">Nome:</span>
                        <span className="content">{student.nome}</span>
                    </div>

                    <div className="dialogInput">
                        <span className="title">Turma:</span>
                        <span className="content">{student.turma}</span>
                    </div>
                </div>

                <div className="studentGraph">
                    <CircleChartItem
                        color1={color1}
                        color2={color2}
                        percentage={student.media}
                    />
                </div>
            </div>
            <div className="dialogButtons">
                <BoschButton text="Confirmar" type="primary" />
                <BoschButton text="Cancelar" type="secondary" onClick={onClose} />
            </div>
        </dialog>
    );
}

export default StudentDetails;
