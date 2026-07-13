import { useState } from "react";
import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";
import Dialog from "../../components/Dialog";

function Planning() {
  const [subjects, setSubjects] = useState([
    { name: "DS-Machine Learning"},
    { name: "DS-Angular"},
    { name: "ADD-Excel"},
    { name: "MAN-IoT"},
  ]);

  const [selectedRoom, setSelectedRoom] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectSelected, setSujectSelected] = useState({});

  const changeModal = () =>{
    setIsModalOpen(!isModalOpen)
  }

  const handleSubjectClick = (item) =>{
    changeModal()
    setSujectSelected(item)
  }

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
            type={'planning'} 
            />
        <div className="content">
            { isModalOpen && 
                <Dialog></Dialog>
            }
            <MonthlyCalendar />
        </div>
      </div>
    </>
  );
}

export default Planning;
