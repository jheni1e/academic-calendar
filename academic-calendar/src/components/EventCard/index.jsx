import { useState } from "react";
import "./index.css";
import Dialog from "../Dialog";

function getEventColor(event) {
  const colors = [
    "#007BC0",
    "#004975",
    "#00884A",
    "#9E2896",
    "#18837E",
    "#BE0004",
  ];

  const id =
    event.subject_instructor?.subject?.subject_id ??
    event.event_id;

  return colors[id % colors.length];
}

function EventCard({ event, compact, refreshEvents }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogType, setDialogType] = useState("view-event");

  const changeModal = async () => {
    setIsModalOpen(!isModalOpen);
    setDialogType("view-event");

    if (refreshEvents) {
      await refreshEvents();
    }
  };

  const color = getEventColor(event);

  const start = new Date(event.start_date);

  const time = start.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div
        className={`event-card ${compact ? "compact" : ""}`}
        style={{
          "--event-color": color,
          opacity: event.status === "SCHEDULED" ? 0.4 : 1,
        }}
        onClick={() => changeModal()}
      >
        {!compact && (
          <>
            <span className="event-title">{event.title}</span>
          </>
        )}
      </div>
      {isModalOpen && (
        <Dialog
          event={event}
          isOpen={isModalOpen}
          onClose={changeModal}
          title={event.title}
          type={dialogType}
          setType={setDialogType}
        ></Dialog>
      )}
    </>
  );
}

export default EventCard;
