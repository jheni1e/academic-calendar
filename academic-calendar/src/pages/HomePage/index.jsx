import { useEffect, useState } from "react";
import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";
import { getData } from "../../utils/apiBack";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isInstructor, setIsInstructor] = useState(false);
  const [events, setEvents] = useState([
    {
      event_id: 1,
      title: "Prova de Python",
      start_date: "2026-07-24T08:30:00",
      end_date: "2026-07-24T10:00:00"
    },
    {
      event_id: 2,
      title: "Reunião da Equipe",
      start_date: "2026-07-24T14:00:00",
      end_date: "2026-07-24T15:30:00"
    },
    {
      event_id: 3,
      title: "Apresentação Final",
      start_date: "2026-07-26T09:00:00",
      end_date: "2026-07-26T11:00:00"
    }]);
  const navigate = useNavigate();

  useEffect(() => {
    initUserInfo();
  },[]);

  useEffect(() => {
    getUserEvents();

    const interval = setInterval(() => {
      getUserEvents();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
    const edv = sessionStorage.getItem("user");

    const user = await getData(`/user/edv/${edv}`);
    const userId = user.user.id;

    if (user.user.role === "ADMIN" || user.user.role === "APPRENTICE") {
      const allEvents = await getData("/event/all");

      setEvents(allEvents);
    }
  };

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
          <MonthlyCalendar type={'calendar'} events={events} />
        </div>
      </div>
    </>
  );
}

export default Home;
