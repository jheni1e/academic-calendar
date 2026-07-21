import './index.css';

export default function EventCard({ event, compact }) {
  return (
    <div className={`event-card ${compact ? "compact" : ""}`} style={{ backgroundColor: event.color }}>
      {!compact && (
        <span>{event.title}</span>)}
    </div>
  );
}