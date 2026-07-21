import EventCard from "../EventCard";
import "./index.css";

function DayCell({ day, events, viewMode, compact }) {
  const morningEvents = events
    .filter((event) => event.period === "morning")
    .slice(0, 3);

  const afternoonEvents = events
    .filter((event) => event.period === "afternoon")
    .slice(0, 3);

  return (
    <div className={`day-cell ${viewMode === "week" ? "week" : "month"} ${compact ? "compact" : ""}`}>
      <span className="day-number">{day}</span>

      <div className="period morning">
        {morningEvents.map((event) => (
          <EventCard key={event.id} event={event} compact={compact} />
        ))}
      </div>

      <div className="period afternoon">
        {afternoonEvents.map((event) => (
          <EventCard key={event.id} event={event} compact={compact} />
        ))}
      </div>
    </div>
  );
}

export default DayCell;
