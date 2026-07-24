import { useEffect, useState } from "react";
import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";
import { getData } from "../../utils/apiBack";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../components/BoschToast";

function Home() {
  const [isInstructor, setIsInstructor] = useState(false);

  const [events, setEvents] = useState([]);

  const [view, setView] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const filterOptions = [
    { value: "ALL", label: "Todos" },
    { value: "CLASS", label: "Turmas" },
    { value: "PERSON", label: "Pessoas" },
    { value: "ROOMS", label: "Salas" }
  ];

  const [filterItems, setFilterItems] = useState({
    CLASS: [],
    PERSON: [],
    ROOMS: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    initUserInfo();
    initDropdownInfo();
  }, []);

  useEffect(() => {
    if (isInstructor) {
      setView("CLASSES");
    } else {
      setView("PERSONAL");
    }
  }, [isInstructor]);

  useEffect(() => {
    if (!view) return;

    getUserEvents();

  }, [view, selectedFilter]);

  const initUserInfo = async () => {
    const edv = sessionStorage.getItem("user");

    if (!edv) {
      navigate("/login");
      return;
    }

    const user = await getData(`/user/edv/${edv}`);

    setIsInstructor(user.user.role === "ADMIN" || user.user.role === "INSTRUCTOR");
  }

  const initDropdownInfo = async () => {
    try {
      const rooms = await getData("/room/all");
      const classes = await getData("/class/all");
      const people = await getData("/user/all");

      setFilterItems({
        ROOMS: rooms.map(room => ({
          value: room.room_id,
          label: room.title
        })),

        CLASS: classes.map(c => ({
          value: c.class_id,
          label: c.name
        })),

        PERSON: people.map(person => ({
          value: person.id,
          label: person.name
        }))
      });

    } catch (error) {
      toastError(`Error: ${error.message}`)
    }
  };

  const getUserEvents = async () => {
    try {
      let response;
  
      if (isInstructor) {
        if (filterType === "CLASS" && selectedFilter) {
          response = await getData(`/event/class/${selectedFilter}`);
        }
        else if (filterType === "PERSON" && selectedFilter) {
          response = await getData(`/event/user/${selectedFilter}`);
        }
        else if (filterType === "ROOMS" && selectedFilter) {
          response = await getData(`/event/room/${selectedFilter}`);
        }
        else {
          response = await getData("/event/all");
        }
      } else {
        if (view === "PERSONAL") {
          response = await getData("/event/personal");
        }
        if (view === "CLASS") {
          // response = await getData("/event/class/my");
        }
      }
      setEvents(response);
  
    } catch(error) {
      toastError(error.message);
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
        <MenuSideBar
          option1={isInstructor ? "Turmas" : "Pessoal"}
          option2={isInstructor ? "Salas" : "Turma"}
          option1Value={isInstructor ? "CLASSES" : "PERSONAL"}
          option2Value={isInstructor ? "ROOMS" : "CLASS"}
          view={view}
          onToggleChange={setView}
          hasToggle={!isInstructor}
          hasCheckbox={true}
          type="calendar"
          {...(isInstructor && {
            filterOptions,
            filterType,
            setFilterType,
            filterItems: filterItems[filterType] || [],
            selectedFilter,
            setSelectedFilter
          })}
          items={subjects} />

        <div className="content">
          <MonthlyCalendar type={'calendar'} events={events} />
        </div>
      </div>
    </>
  );
}

export default Home;
