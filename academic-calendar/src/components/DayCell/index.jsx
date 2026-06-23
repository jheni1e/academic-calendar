import EventCard from "../EventCard";
import "./index.css";

export default function DayCell({ day, events, viewMode }) {
  return (
    <>
      <div className={`day-cell ${viewMode === "week" ? "week" : "month"}`}>
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