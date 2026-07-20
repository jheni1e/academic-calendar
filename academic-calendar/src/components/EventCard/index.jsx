import './index.css';

export default function EventCard({ event }) {
  return (
    <div className="event-card" style={{ backgroundColor: event.color }}>
      <span>{event.time} {event.title}</span>
    </div>
  );
}