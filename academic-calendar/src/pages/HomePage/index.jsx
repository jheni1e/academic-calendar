import { useEffect, useState } from "react";
import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";
import { getData } from "../../utils/apiBack";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../components/BoschToast";

function Home() {
  const [isInstructor, setIsInstructor] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [subjects, setSubjects] = useState([]);

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
    if (!userLoaded) return;
  
    setView(isInstructor ? "CLASSES" : "PERSONAL");
  
  }, [userLoaded, isInstructor]);

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
  
    const response = await getData(`/user/edv/${edv}`);
  
    const user = response.user;
  
    const instructor =
      user.role === "ADMIN" ||
      user.role === "INSTRUCTOR";
  
    setIsInstructor(instructor);
  
    await loadSubjects(user.id, user.classId, instructor);
  
    setUserLoaded(true);
  };

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

    } catch (error) {
      toastError(error.message);
    }
  };

  const [dropdownOptions, setDropdownOptions] = useState([
    { value: 1, label: "oii" }
  ]);

  const loadSubjects = async (userId, classId, instructor) => {
    try {
      let response;
  
      if (instructor) {
        response = await getData(`/subject/instructor/${userId}`);
      } else {
        response = await getData(`/subject/class/${classId}`);
      }
  
      const unfinishedSubjects = response
        .filter(subject =>
          subject.completedWorkload < subject.workload
        )
        .map(subject => ({
          name: subject.name,
          value: Math.round(
            (subject.completedWorkload / subject.workload) * 100
          )
        }));
  
      setSubjects(unfinishedSubjects);
  
    } catch(error) {
      toastError(error.message);
    }
  };

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
