import ViewSubjectComponent from "../../components/ViewSubjectComponent";
import BoschButton from "../../components/BoschButton";
import "./index.css";
import MenuSideBar from "../../components/MenuSideBar";
import { useState } from "react";
import Dialog from "../../components/Dialog";

function Subject() {
  const [selectedValue, setSelectedValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSubjectOpen, setIsModalSubjectOpen] = useState(false);
  const [subjectSelected, setSubjectSelected] = useState({})

  const subjects = [
    { name: "IOT", responsible: "Patrick", class: "dta", percentage: 78, initial: "12-02-2026", end: "30-03-2026", workload: 80 },
    { name: "Projeto FullStack", responsible: "Cristian", class: "dta", percentage: 98, initial: "12-02-2026", end: "30-03-2026", workload: 80},
    { name: "Excell", responsible: "Queila", class: "analise", percentage: 68, initial: "12-02-2026", end: "30-03-2026", workload: 80 },
    { name: "Python", responsible: "Queila", class: "analise", percentage: 47, initial: "12-02-2026", end: "30-03-2026", workload: 80 },
  ]

  const listMenu = [
    { value: "analise", label: "Análise" },
    { value: "dta", label: "DTA" },
    { value: "manufatura", label: "Manufatura" }
  ];
  const SubjectClicked = (subject) => {
    setIsModalSubjectOpen(!isModalSubjectOpen)
    setSubjectSelected(subject)
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
                  Responsible={subject.responsible}
                  Percentage={subject.percentage}
                  Class={subject.class}
                  onClick={() => SubjectClicked(subject)}
                />
              ))}
          </div>
        </div>
        {isModalOpen &&
          <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar matéria" type="subject" />
        }
        {isModalSubjectOpen && 
          <Dialog isOpen={isModalSubjectOpen} onClose={() => setIsModalSubjectOpen(false)} title={subjectSelected.name} subjectDetails={subjectSelected} type="details-subject"></Dialog>
        }
      </div>
    </>
  );
}

export default Subject;
