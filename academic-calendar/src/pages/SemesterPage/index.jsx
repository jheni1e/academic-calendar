import { useState } from "react";
import SemesterCalendar from "../../components/SemesterCalendar";
import "./index.css";

function Semester() {
  const [isInstructor, setIsInstructor] = useState(false);

  return (
    <>
      <SemesterCalendar semester={1} year={2026} />
    </>
  );
}

export default Semester;
