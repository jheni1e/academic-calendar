import { useState } from "react";
import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";
import PopupDetails from "../../components/PopupDetails";
import Dialog from "../../components/Dialog";

function Home() {
  const [isInstructor, setIsInstructor] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const dsIoT = {
    name: "DS-IoT",
    totalHours: 60,
    leftHours: 20
  }

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
            items={subjects}
            selectedValueDrop={selectedRoom}
            onDropDownChange={(e) => setSelectedRoom(e.target.value)} />
        }
        {!isInstructor &&
          <MenuSideBar option1="Pessoal" option2="Turma"
            hasToggle={true}
            hasItems={true}
            items={subjects}
            selectedValueDrop={selectedRoom}
            onDropDownChange={(e) => setSelectedRoom(e.target.value)} />
        }
        <div className="content">
          <MonthlyCalendar />
          <div className="event">
            DS IoT

            <PopupDetails type="class" selectedClass={dsIoT} isEditable={true} onEdit={() => setIsDialogOpen(true)} />
          </div>
        </div>
        <Dialog
            title="Editar horário"
            type="editDate"
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </>
  );
}

export default Home;
