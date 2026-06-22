import ViewSubjectComponent from "../../components/ViewSubjectComponent";
import BoschButton from "../../components/BoschButton";
import "./index.css";
import MenuSideBar from "../../components/MenuSideBar";

function Subject() {
  const listMenu = ["analise", "dta", "manufatura", "mecanico"]
  return (
    <>
      <div className="container-page">
        <MenuSideBar hasToggle={false} hasDropDown={true} OptionsDropDown={listMenu} LabelDropDown={"Turmas"}></MenuSideBar>
        <div className="container-subjects">
          <div className="title">
            <h1 >Todas as Matérias</h1>
            <div className="button">
              <BoschButton text={"+  Adicionar Matéria"} type={"secondary"}></BoschButton>
            </div>

          </div>
          <ViewSubjectComponent SubjectName={"IOT"} Responsible={"Patrick"} Percentage={78}></ViewSubjectComponent>
          <ViewSubjectComponent SubjectName={"Projeto FullStack"} Responsible={"Cristian"} Percentage={48}></ViewSubjectComponent>
          <ViewSubjectComponent SubjectName={"Excell"} Responsible={"Queila"} Percentage={68}></ViewSubjectComponent>
          <ViewSubjectComponent SubjectName={"Python"} Responsible={"Queila"} Percentage={100}></ViewSubjectComponent>
          <ViewSubjectComponent SubjectName={"C#"} Responsible={"Trevisan"} Percentage={64}></ViewSubjectComponent>
        </div>
      </div>
    </>
  );
}

export default Subject;
