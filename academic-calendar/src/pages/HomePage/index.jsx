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
  const [showExternal, setShowExternal] = useState(true);
  const [showLesson, setShowLesson] = useState(true);

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
  }, [view, filterType, selectedFilter]);

  const filteredEvents = events.filter(event => {
    if (!showExternal && !showLesson) {
      return false;
    }

    if (showExternal && showLesson) {
      return true;
    }

    return (
      (showExternal && event.event_type === "EXTERNAL") ||
      (showLesson && event.event_type === "LESSON")
    );
  });

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
        switch (filterType) {
          case "CLASS":
            response = selectedFilter
              ? await getData(`/class/events/${selectedFilter}`)
              : await getData("/event/all");
            break;
          case "PERSON":
            response = selectedFilter
              ? await getData(`/user/events/${selectedFilter}`)
              : await getData("/event/all");
            break;
          case "ROOMS":
            response = selectedFilter
              ? await getData(`/room/events/${selectedFilter}`)
              : await getData("/event/all");
            break;
          case "ALL":
          default:
            response = await getData("/event/all");
            break;
        }
      } else {
        if (view === "PERSONAL") {
          const edv = sessionStorage.getItem("user");

          if (!edv) {
            navigate("/login");
            return;
          }

          const response = await getData(`/user/edv/${edv}`);

          const user = response.user;
          const userId = user.id;

          response = await getData(`/user/events/${userId}`);
        }
        if (view === "CLASS") {
          const edv = sessionStorage.getItem("user");

          if (!edv) {
            navigate("/login");
            return;
          }

          const response = await getData(`/user/edv/${edv}`);

          const user = response.user;
          const userId = user.id;

          response = await getData(`/class/events/${selectedFilter}`);
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

    } catch (error) {
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
          hasCheckbox={userLoaded && isInstructor}
          type="calendar"
          {...(isInstructor && {
            filterOptions,
            filterType,
            setFilterType,
            filterItems: filterItems[filterType] || [],
            selectedFilter,
            setSelectedFilter,
            showExternal,
            setShowExternal,
            showLesson,
            setShowLesson
          })}
          items={subjects} />

        <div className="content">
          <MonthlyCalendar type={'calendar'} events={filteredEvents} />
        </div>
      </div>
    </>
  );
}

export default Home;
