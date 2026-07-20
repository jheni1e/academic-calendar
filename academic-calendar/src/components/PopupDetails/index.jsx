import './index.css';

function PopupDetails({ type, isEditable, selectedClass, selectedEvent, onEdit }) {
    return (
        <div className="popupBody">
            <div className="popupHeader">
                {type === "class" &&
                    <h3 className="title">{selectedClass.name}</h3>}
                {type === "event" &&
                    <h3 className="title">{selectedEvent.name}</h3>}
                {isEditable &&
                    <button onClick={onEdit} className="headerButton">✎</button>}
            </div>
            {type === "class" &&
                <div className="content">
                    <h3 className="text">Horas total: {selectedClass.totalHours}h</h3>
                    <h3 className="text">Horas restantes: {selectedClass.leftHours}h</h3>
                </div>}
            {type === "event" &&
                <div className="content">
                    <h3 className="text">Início: {selectedEvent.startDate}</h3>
                    <h3 className="text">Encerramento: {selectedEvent.dueDate}</h3>
                </div>}
        </div>
    );
}

export default PopupDetails;
