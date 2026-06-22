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

export default function MonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="actions">
          <BoschButton text="<" type="secondary" />
          <BoschButton text=">" type="secondary" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 'normal' }}>
          {months[month]} {year}
        </h1>

        <div className="actions">
          <BoschButton text="+" type="secondary" />
          <Toggle id="calendar-toggle" leftText="Mensal" rightText="Semanal" />
        </div>
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
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="empty-cell" />
        ))}

        {days.map((day) => (
          <DayCell key={day} day={day} events={[]} />
        ))}
      </div>
    </div>
  );
}
