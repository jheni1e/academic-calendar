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
  const [color] = useState(getEventColor());
  const [dialogType, setDialogType] = useState("view-event");
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className={`event-card ${compact ? "compact" : ""}`}
        style={{ backgroundColor: getEventColor(event.event_id) }}>
        {!compact && <span>{event.title}</span>}
      </div>
      {isModalOpen &&
        <Dialog event={event} isOpen={isModalOpen} onClose={changeModal} title={event.title} type={dialogType} setType={setDialogType}></Dialog>
      }
    </>
  );
}

export default EventCard;
