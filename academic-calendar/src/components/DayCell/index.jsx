import EventCard from "../EventCard";
import "./index.css";

function DayCell({ day, events = [], viewMode, compact }) {
  const dayEvents = events.filter((event) => {
    const date = new Date(event.start_date);

    return date.getDate() === day;
  });

  const morningEvents = dayEvents.filter((event) => {
    const hour = new Date(event.start_date).getHours();
    return hour < 12;
  });

  const afternoonEvents = dayEvents.filter((event) => {
    const hour = new Date(event.start_date).getHours();
    return hour >= 12;
  });

  return (
    <div className={`day-cell ${viewMode === "week" ? "week" : "month"} ${compact ? "compact" : ""}`}>
      <span className="day-number">{day}</span>

      <div className="period morning">
        {morningEvents.map((event) => (
          <EventCard key={event.event_id} event={event} compact={compact} />
        ))}
      </div>

      <div className="period afternoon">
        {afternoonEvents.map((event) => (
          <EventCard key={event.event_id} event={event} compact={compact} />
        ))}
      </div>
    </div>
  );
}

export default DayCell;
