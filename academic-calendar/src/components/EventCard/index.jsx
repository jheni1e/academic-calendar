import { useState } from 'react';
import './index.css';
import Dialog from '../Dialog';

function getEventColor(id) {
  const colors = [
    "#007BC0",
    "#004975",
    "#00884A",
    "#9E2896",
    "#18837E",
    "#ED0007"
  ];

  return colors[id % colors.length];
}


function EventCard({ event, compact }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState("view-event");

  const changeModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const color = getEventColor(event.event_id);

  const start = new Date(event.start_date);

  const time = start.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
  console.log("Evento", event)

  return (
    <>
      <div
        className={`event-card ${compact ? "compact" : ""}`}
        style={{ "--event-color": color }}
        onClick={() => changeModal()}
        >
        {!compact && (
          <>
            <span className="event-title">
              {event.title}
            </span>
          </>
        )}
      </div>
      {isModalOpen &&
        <Dialog event={event} isOpen={isModalOpen} onClose={changeModal} title={event.title} type={dialogType} setType={setDialogType}></Dialog>
      }
    </>

  );
}

export default EventCard;
