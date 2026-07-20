import { useState } from "react";
import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";

function Home() {
  const [isInstructor, setIsInstructor] = useState(false);

  const [dropdownOptions, setDropdownOptions] = useState([
    { value: 1, label: "oii" }
  ]);

  const [subjects, setSubjects] = useState([
    { name: "DS-Machine Learning", value: 30 },
    { name: "DS-Angular", value: 60 },
    { name: "ADD-Excel", value: 40 },
    { name: "MAN-IoT", value: 80 },
  ]);

  const [selectedRoom, setSelectedRoom] = useState("");

  return (
    <>
      <div className="body">
        {isInstructor &&
          <MenuSideBar option1="Turmas" option2="Salas"
            hasToggle={true}
            hasDropDown={true}
            OptionsDropDown={dropdownOptions}
            hasCheckbox={true}
            hasItems={true}
            type={'calendar'}
            items={subjects}
            selectedValueDrop={selectedRoom}
            onDropDownChange={(e) => setSelectedRoom(e.target.value)} />
        }
        {!isInstructor &&
          <MenuSideBar option1="Pessoal" option2="Turma"
            hasToggle={true}
            hasItems={true}
            type={'calendar'}
            items={subjects}
            selectedValueDrop={selectedRoom}
            onDropDownChange={(e) => setSelectedRoom(e.target.value)} />
        }
        <div className="content">
          <MonthlyCalendar type={'calendar'} />
        </div>
      </div>
    </>
  );
}

export default Home;
