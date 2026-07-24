import { useEffect, useState } from "react";
import MenuSideBar from "../../components/MenuSideBar";
import MonthlyCalendar from "../../components/MonthlyCalendar";
import "./index.css";
import Dialog from "../../components/Dialog";
import { getData } from "../../utils/apiBack";
import { useNavigate } from "react-router-dom";

function Planning() {
  const [subjects, setSubjects] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectSelected, setSujectSelected] = useState({});
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    initUserInfo();
  }, []);

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

    const response = await getData(`/user/edv/${edv}`);

    const user = response.user;

    if (user.role === "APPRENTICE") {
      navigate("/unauthorized");
      return;
    }

    if (user.role === "ADMIN" || user.role === "INSTRUCTOR") {
      await loadSubjects(user.id);
    }
  };

  const loadSubjects = async (userId) => {
    try {
      const response = await getData(`/subject/instructor/${userId}/ongoing`);

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
      console.error(error);
    }
  };

  const getUserEvents = async () => {
    const edv = sessionStorage.getItem("user");

    const user = await getData(`/user/edv/${edv}`);
    const userId = user.user.id;

    if (user.user.role === "ADMIN" || user.user.role === "APPRENTICE") {
      const allEvents = await getData("/event/all");

      setEvents(allEvents);
    }
  };

  const changeModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleSubjectClick = (item) => {
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
          selectedValueDrop={selectedRoom}
          type="planning"
          items={subjects}
          onItemClick={(item) => handleSubjectClick(item)}
        />
        <div className="content">
          {isModalOpen &&
            <Dialog type={'planning'} isOpen={isModalOpen} onClose={changeModal} title={`Planejamento ${subjectSelected.name}`}></Dialog>
          }
          <MonthlyCalendar events={events} />
        </div>
      </div>
    </>
  );
}

export default Planning;
