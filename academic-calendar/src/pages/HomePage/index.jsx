import { useEffect, useState } from "react";
import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";
import { getData } from "../../utils/apiBack";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isInstructor, setIsInstructor] = useState(false);

  const [events, setEvents] = useState([]);

  const [view, setView] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    initUserInfo();
  }, []);

  useEffect(() => {
    if (isInstructor) {
      setView("CLASSES");
      console.log("turmas")
    } else {
      setView("PERSONAL");
      console.log("pessoal")
    }
  }, [isInstructor]);

  useEffect(() => {
    getUserEvents();

    const interval = setInterval(() => {
      getUserEvents();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!view) return;

    getUserEvents();

    const interval = setInterval(getUserEvents, 3000);

    return () => clearInterval(interval);
  }, [view]);

  const initUserInfo = async () => {
    const edv = sessionStorage.getItem("user");

    if (!edv) {
      navigate("/login");
      return;
    }

    const user = await getData(`/user/edv/${edv}`);

    setIsInstructor(user.user.role === "ADMIN" || user.user.role === "INSTRUCTOR");
  }

  const getUserEvents = async () => {
    switch (view) {
      case "PERSONAL":
        setEvents([]);
        break;

      case "CLASS":
        setEvents([]);
        break;

      case "CLASSES":
        const events = await getData("/event/all");

        setEvents(events);
        break;

      case "ROOMS":
        setEvents([]);
        break;
    }
  }

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
        <MenuSideBar
          option1={isInstructor ? "Turmas" : "Pessoal"}
          option2={isInstructor ? "Salas" : "Turma"}
          option1Value={isInstructor ? "CLASSES" : "PERSONAL"}
          option2Value={isInstructor ? "ROOMS" : "CLASS"}
          view={view}
          onToggleChange={setView}
          hasToggle={true}
          hasDropDown={true}
          OptionsDropDown={dropdownOptions}
          hasCheckbox={true}
          hasItems={true}
          type="calendar"
          items={subjects}
          selectedValueDrop={selectedRoom}
          onDropDownChange={(e) => setSelectedRoom(e.target.value)} />

        <div className="content">
          <MonthlyCalendar type={'calendar'} events={events} />
        </div>
      </div>
    </>
  );
}

export default Home;
