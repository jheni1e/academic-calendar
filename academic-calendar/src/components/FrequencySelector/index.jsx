import './index.css';
import { useEffect, useState } from "react";

const days = ["S", "T", "Q", "Q", "S"];

export default function FrequencySelector({ value = [], onChange }) {
    const [selectedDays, setSelectedDays] = useState(value);

    const toggleDay = (index) => {
        const updatedDays = selectedDays.includes(index)
            ? selectedDays.filter(item => item !== index)
            : [...selectedDays, index];

        setSelectedDays(updatedDays);

        onChange(updatedDays);
    };

    return (
        <div className="days-container">
            {days.map((day, index) => (
                <button
                    type="button"
                    key={index}
                    className={`day-circle ${
                        selectedDays.includes(index) ? "selected" : ""
                    }`}
                    onClick={() => toggleDay(index)}
                >
                    {day}
                </button>
            ))}
        </div>
    );
}