import ViewSubjectComponent from "../../components/ViewSubjectComponent";
import BoschButton from "../../components/BoschButton";
import "./index.css";
import MenuSideBar from "../../components/MenuSideBar";
import { useState } from "react";

function Subject() {
  const [selectedValue, setSelectedValue] = useState("");
  const subjects = [
    {name: "IOT", reponsible: "Patrick", class: "dta", percentage: 78},
    {name: "Projeto FullStack", reponsible: "Cristian", class: "dta", percentage: 98},
    {name: "Excell", reponsible: "Queila", class: "analise", percentage: 68},
    {name: "Python", reponsible: "Queila", class: "analise", percentage: 47},
  ]
  
  const listMenu = [
    { value: "analise", label: "Análise" },
    { value: "dta", label: "DTA" },
    { value: "manufatura", label: "Manufatura" }
  ];

  console.log(selectedValue);
  return (
    <>
      <div className="container-page">
        <MenuSideBar 
          hasToggle={false} 
          hasDropDown={true} 
          OptionsDropDown={listMenu} 
          LabelDropDown={"Turmas"} 
          selectedValueDrop={selectedValue}
          onDropDownChange={(e) => setSelectedValue(e.target.value)}></MenuSideBar>
        <div className="container-subjects">
          <div className="title">
            <h1 >Todas as Matérias</h1>
            <div className="button">
              <BoschButton text={"+  Adicionar Matéria"} type={"secondary"}></BoschButton>
            </div>
          </div>
          {subjects
            .filter(subject =>
              selectedValue === "" || subject.class === selectedValue
            )
            .map((subject)=> (
              <ViewSubjectComponent SubjectName={subject.name} Responsible={subject.reponsible} Percentage={subject.percentage} Class={subject.class}></ViewSubjectComponent>
          ))}
        </div>
      </div>
    </>
  );
}

export default Subject;
