import ViewSubjectComponent from "../../components/ViewSubjectComponent";
import BoschButton from "../../components/BoschButton";
import "./index.css";
import MenuSideBar from "../../components/MenuSideBar";
import { useState, useEffect } from "react";
import Dialog from "../../components/Dialog";
import { getData } from '../../utils/apiBack';
import { useNavigate } from "react-router-dom";
import { toastError } from "../../components/BoschToast";

function Subject() {
  const [selectedValue, setSelectedValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [listMenu, setListMenu] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    initUserInfo();
    loadSubjects();
    loadClasses();
  }, []);

  useEffect(() => {
    loadSubjects();

    const interval = setInterval(() => {
      loadSubjects();
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

    if (user.user.role === "APPRENTICE") {
      navigate("/unauthorized");
      return;
    }
  }

  const loadClasses = async () => {
    try {
      const data = await getData("/class/all");

      const formatedClasses = data.map((d) => ({
        value: d.class_id,
        label: d.name
      }));

      setListMenu(formatedClasses);
    } catch (error) {
      toastError(`Erro: ${error.message}`)
    }
  };

  const loadSubjects = async () => {
    try {
      const data = await getData("/subject/all");

      const subjectsWithClass = await Promise.all(
        data.map(async (subject) => {
          const classData = await getData(`/class/${subject.class_id}`);
  
          return {
            ...subject,
            className: classData.name
          };
        })
      );

      console.log(subjectsWithClass)
  
      setSubjects(subjectsWithClass);
    } catch (error) {
      toastError(`Erro: ${error.message}`)
    }
  }

  return (
    <>
      <div className="container-page">
        <MenuSideBar
          hasToggle={false}
          hasDropDown={true}
          optionsDropDown={listMenu}
          labelDropDown="Turmas"
          selectedValueDrop={selectedValue}
          onDropDownChange={(e) => setSelectedValue(e.target.value)}
        />

        <div className="container-subjects">
          <div className="title">
            <h1>Todas as Matérias</h1>

            <BoschButton
              text="+ Adicionar Matéria"
              type="secondary"
              style={{ width: "250px" }}
              onClick={() => setIsModalOpen(!isModalOpen)}
            />
          </div>

          <div className="subjects-list">
            {subjects
              .filter(subject =>
                selectedValue === "" || subject.class === selectedValue
              )
              .map(subject => (
                <ViewSubjectComponent
                  key={subject.name}
                  subjectName={subject.name}
                  responsible={subject.responsible}
                  workload={subject.workload}
                  completedWorkload={subject.completedWorkload}
                  studentClass={subject.className}
                />
              ))}
          </div>
        </div>
        {isModalOpen &&
          <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar matéria" type="subject" />
        }
      </div>
    </>
  );
}

export default Subject;
