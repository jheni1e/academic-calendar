import { useState } from "react";
import DayCell from "../DayCell";
import "./index.css";
import Toggle from "../Toggle";
import BoschButton from "../BoschButton";
import Dialog from "../Dialog";
import DropdownList from "../DropdownList";

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

const viewOptions = [
  { value: "month", label: "Mensal" },
  { value: "week", label: "Semanal" },
  { value: "semester", label: "Semestral" }
];

function MonthlyCalendar({ initialDate, compact = false, type, events }) {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [viewMode, setViewMode] = useState("month");

  const [semester, setSemester] = useState(
    currentDate.getMonth() < 6 ? 1 : 2
  );

  const semesterMonths =
    semester === 1
      ? [0, 1, 2, 3, 4, 5]
      : [6, 7, 8, 9, 10, 11];

  const [isModalOpen, setIsModalOpen] = useState(false);

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

    switch (viewMode) {
      case "week":
        newDate.setDate(newDate.getDate() - 7);
        break;

      case "month":
        newDate.setMonth(newDate.getMonth() - 1);
        break;

      case "semester":
        newDate.setMonth(newDate.getMonth() - 6);
        setSemester((prev) => (prev === 1 ? 2 : 1));
        break;
    }

    setCurrentDate(newDate);
  };


  const goNext = () => {
    const newDate = new Date(currentDate);

    switch (viewMode) {
      case "week":
        newDate.setDate(newDate.getDate() + 7);
        break;

      case "month":
        newDate.setMonth(newDate.getMonth() + 1);
        break;

      case "semester":
        newDate.setMonth(newDate.getMonth() + 6);
        setSemester((prev) => (prev === 1 ? 2 : 1));
        break;

      default:
        break;
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

        {viewMode !== "semester" && (
          <h1 style={{ fontSize: '2rem', fontWeight: 'normal' }}>
            {months[month]} {year}
          </h1>
        )}

        {!compact && (
          <div className="actions">
            {type === "calendar" &&
              <div className="button-container">
                <BoschButton text="+" type="secondary" onClick={() => setIsModalOpen(!isModalOpen)} />
              </div>
            }
            <DropdownList label="Visão" options={viewOptions} selectedValue={viewMode} onChange={(e) => setViewMode(e.target.value)} />
          </div>
        )}
      </div>

      {viewMode !== "semester" && (
        <>
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
            {viewMode === "month" && (
              <>
                {emptyCells.map((_, index) => (
                  <div key={`empty-${index}`} className="empty-cell" />
                ))}
                {days.map((day) => {
                  return (
                    <DayCell
                      key={day}
                      day={day}
                      events={events}
                      viewMode={viewMode}
                      compact={compact}
                    />
                  );
                })}
              </>
            )}
            {viewMode === "week" && (
              weekDays.map((date) => (
                <DayCell
                  key={date.toISOString()}
                  day={date.getDate()}
                  events={events}
                  isToday={date.toDateString() === new Date().toDateString()}
                  viewMode={viewMode}
                />
              ))
            )}
          </div>
        </>
      )}

      {viewMode === "semester" && (
        <div className="semester-calendar">
          {semesterMonths.map(month => (
            <MonthlyCalendar
              key={month}
              initialDate={new Date(year, month, 1)}
              compact
            />
          ))}
        </div>
      )}

      {isModalOpen &&
        <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar evento" type="event" />
      }
    </div>
  );
}

export default MonthlyCalendar;
