import { useState } from "react";
import MonthlyCalendar from "../MonthlyCalendar";
import BoschButton from "../BoschButton";
import "./index.css";

function SemesterCalendar({ year = new Date().getFullYear() }) {
    const [semester, setSemester] = useState(
        new Date().getMonth() < 6 ? 1 : 2
    );

    const [currentYear, setCurrentYear] = useState(year);
    const months = semester === 1 ? [0, 1, 2, 3, 4, 5] : [6, 7, 8, 9, 10, 11];

    const goPrevSemester = () => {
        if (semester === 2) {
            setSemester(1);
        } else {
            setSemester(2);
            setCurrentYear(currentYear - 1);
        }
    };

    const goNextSemester = () => {
        if (semester === 1) {
            setSemester(2);
        } else {
            setSemester(1);
            setCurrentYear(currentYear + 1);
        }
    };

    return (
        <div>
            <div className="semester-header">
                <BoschButton text="<" type="secondary" onClick={goPrevSemester} />

                <h1>
                    {semester}º Semestre de {currentYear}
                </h1>

                <BoschButton text=">" type="secondary" onClick={goNextSemester} />
            </div>

            <div className="semester-calendar">
                {months.map((month) => (
                    <MonthlyCalendar
                        key={month}
                        initialDate={new Date(currentYear, month, 1)}
                        compact={true}
                    />
                ))}
            </div>
        </div>
    );
}

export default SemesterCalendar;
