import ViewSubjectComponent from "../../components/ViewSubjectComponent";
import BoschButton from "../../components/BoschButton";
import "./index.css";
import MenuSideBar from "../../components/MenuSideBar";
import { useState, useEffect } from "react";
import Dialog from "../../components/Dialog";
import { getData } from '../../utils/apiBack';

function Subject() {
  const [selectedValue, setSelectedValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([])
  const [listMenu, setListMenu] = useState([])

  useEffect(() => {
    loadSubjects();
    loadClasses();
  }, []);
  
  const loadClasses = async () => {
    console.log("classes")
    try {
      const data = await getData("/class/all");
      setListMenu(data);
      console.log("Turmas")
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

const loadSubjects = async () => {
    console.log("materias")
  try {
    const data = await getData("/ subject/all");
    setSubjects(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

  console.log(selectedValue);
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
