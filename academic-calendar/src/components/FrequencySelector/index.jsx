import './index.css';
import { useState } from "react";

const days = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function FrequencySelector() {
    const [selectedDays, setSelectedDays] = useState([]);

    const toggleDay = (index) => {
        setSelectedDays((prev) =>
            prev.includes(index)
                ? prev.filter((item) => item !== index)
                : [...prev, index]
        );
    };

    return (
        <div className="days-container">
            {days.map((day, index) => (
                <button
                    key={index}
                    className={`day-circle ${selectedDays.includes(index) ? "selected" : ""
                        }`}
                    onClick={() => toggleDay(index)}
                >
                    {day}
                </button>
            ))}
        </div>
    );
}