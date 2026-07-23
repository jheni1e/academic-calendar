import { useState } from 'react';
import './index.css';

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
  const color = getEventColor(event.event_id);

  const start = new Date(event.start_date);

  const time = start.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div
      className={`event-card ${compact ? "compact" : ""}`}
      style={{ "--event-color": color }}
    >
      {!compact && (
        <>
          <span className="event-title">
            {event.title}
          </span>
        </>
      )}
    </div>
  );
}

export default EventCard;
