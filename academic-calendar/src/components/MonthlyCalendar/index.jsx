import { useState } from "react";
import DayCell from "../DayCell";
import "./index.css";
import Toggle from "../Toggle";
import BoschButton from "../BoschButton";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function MonthlyCalendar({ initialDate, compact = false }) {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [viewMode, setViewMode] = useState("month");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const emptyCells = Array.from({ length: firstDayOfMonth });

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthOptions = months.map((monthName, index) => ({
    label: monthName,
    value: index,
  }));

  const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek(currentDate));
    date.setDate(date.getDate() + i);
    return date;
  });

  const goPrev = () => {
    const newDate = new Date(currentDate);

    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }

    setCurrentDate(newDate);
  };


  const goNext = () => {
    const newDate = new Date(currentDate);

    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    setCurrentDate(newDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {!compact && (
          <div className="actions">
            <BoschButton text="<" type="secondary" onClick={goPrev} />
            <BoschButton text=">" type="secondary" onClick={goNext} />
          </div>
        )}

        <h1 style={{ fontSize: '2rem', fontWeight: 'normal' }}>
          {months[month]} {year}
        </h1>

        {!compact && (
          <div className="actions">
            <BoschButton text="+" type="secondary" />

            <Toggle id="calendar-toggle" leftText="Mensal" rightText="Semanal" onChange={() => setViewMode((prev) => prev === "month" ? "week" : "month")} />
          </div>
        )}
      </div>

      <div className="weekdays">
        <span>DOM</span>
        <span>SEG</span>
        <span>TER</span>
        <span>QUA</span>
        <span>QUI</span>
        <span>SEX</span>
        <span>SAB</span>
      </div>

      <div className="calendar-grid">
        {viewMode === "month" ? (
          <>
            {emptyCells.map((_, index) => (
              <div key={`empty-${index}`} className="empty-cell" />
            ))}

            {days.map((day) => (
              <DayCell key={day} day={day} events={[]} viewMode={viewMode} />
            ))}
          </>
        ) : (
          weekDays.map((date) => (
            <DayCell
              key={date.toISOString()}
              day={date.getDate()}
              events={[]}
              isToday={date.toDateString() === new Date().toDateString()}
              viewMode={viewMode}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MonthlyCalendar;
