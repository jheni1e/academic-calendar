import ViewSubjectComponent from "../../components/ViewSubjectComponent";
import BoschButton from "../../components/BoschButton";
import "./index.css";
import MenuSideBar from "../../components/MenuSideBar";
import { useState, useEffect } from "react";
import Dialog from "../../components/Dialog";
import { getData } from '../../utils/apiBack';
import { useNavigate } from "react-router-dom";

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

  const initUserInfo = async () => {
    const edv = localStorage.getItem("user");
    const user = await getData(`/user/edv/${edv}`);

    if (!user) {
      navigate("/login");
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
      console.error(error);
    }
  };

  const loadSubjects = async () => {
    try {
      const data = await getData("/subject/all");

      setSubjects(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="container-page">
        <MenuSideBar
          hasToggle={false}
          hasDropDown={true}
          OptionsDropDown={listMenu}
          LabelDropDown="Turmas"
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
                  SubjectName={subject.name}
                  Responsible={subject.reponsible}
                  Percentage={subject.percentage}
                  Class={subject.class}
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
