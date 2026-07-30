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

    setView(isInstructor ? "CLASS" : "PERSONAL");

  }, [userLoaded, isInstructor]);

  useEffect(() => {
    if (!userLoaded || !view) return;

    getUserEvents();
  }, [userLoaded, view, filterType, selectedFilter]);

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

    const classUser = await getData('/user/classes');

    const classId =
      Array.isArray(classUser) && classUser.length > 0
        ? classUser[0].classId
        : null;

    const instructor =
      user.role === "ADMIN" ||
      user.role === "INSTRUCTOR";

    setIsInstructor(instructor);

    if (!classId) {
      setUserLoaded(true);
      return;
    } else {
      await loadSubjects(user.id, null, instructor);
    }

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

          let response = await getData(`/user/edv/${edv}`);

          const user = response.user;
          const userId = user.id;

          response = await getData(`/user/events/${userId}`);

          setEvents(response)
        }
        if (view === "CLASS") {
          const edv = sessionStorage.getItem("user");

          if (!edv) {
            navigate("/login");
            return;
          }

          const classUser = await getData('/user/classes');

          const classId = classUser[0].classId;

          let response = await getData(`/class/events/${classId}`);

          setEvents(response)
        }
      }

      const formattedEvents = response.map(event => ({
        ...event,
        event_id: event.event_id ?? event.id,
        start_date: event.start_date ?? event.startDate,
        end_date: event.end_date ?? event.endDate,
        event_type: event.event_type ?? "EXTERNAL"
      }));

      setEvents(formattedEvents);
    } catch (error) {
      toastError(error.message);
    }
  };

  const loadSubjects = async (userId, classId, instructor) => {
    try {
      let response;

      if (instructor) {
        response = await getData(`/subject/instructor/${userId}/ongoing`);
      } else {
        response = await getData(`/subject/class/${classId}/ongoing`);
      }

      if (!response) {
        setSubjects([]);
        return;
      }

      const unfinishedSubjects = response
        .filter(subject =>
          subject.completed_workload < subject.workload
        )
        .map(subject => ({
          name: subject.name,
          value: Math.round(
            (subject.completed_workload / subject.workload) * 100
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
          option1Value={isInstructor ? "CLASS" : "PERSONAL"}
          option2Value={isInstructor ? "ROOMS" : "CLASS"}
          view={view}
          onToggleChange={setView}
          hasToggle={!isInstructor}
          hasCheckbox={userLoaded && isInstructor}
          hasItems={userLoaded && isInstructor}
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
          <MonthlyCalendar type={'calendar'} events={filteredEvents.filter(e => e.status != "CANCELLED")} refreshEvents={getUserEvents} />
        </div>
      </div>
    </>
  );
}

export default Home;
