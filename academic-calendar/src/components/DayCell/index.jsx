import EventCard from "../EventCard";
import "./index.css";

export default function DayCell({ day, events }) {
  return (
    <>
      <div className="day-cell">
        <span className="day-number">{day}</span>

        <div className="events">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}