import { useState } from "react";
import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";

function Planning() {
  const [subjects, setSubjects] = useState([
    { name: "DS-Machine Learning"},
    { name: "DS-Angular"},
    { name: "ADD-Excel"},
    { name: "MAN-IoT"},
  ]);

  const [selectedRoom, setSelectedRoom] = useState("");

  return (
    <>
      <div className="body">
        <MenuSideBar
            hasToggle={false}
            hasDropDown={false}
            hasCheckbox={false}
            hasItems={true}
            items={subjects}
            selectedValueDrop={selectedRoom}
            type={'planning'}/>
        <div className="content">
          <MonthlyCalendar />
        </div>
      </div>
    </>
  );
}

export default Planning;
