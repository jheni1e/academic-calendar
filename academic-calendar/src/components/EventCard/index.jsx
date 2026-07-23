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
  const [color] = useState(getEventColor());

  return (
    <div
      className={`event-card ${compact ? "compact" : ""}`}
      style={{ backgroundColor: getEventColor(event.event_id) }}>
      {!compact && <span>{event.title}</span>}
    </div>
  );
}

export default EventCard;
