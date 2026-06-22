import ViewSubjectComponent from "../../components/ViewSubjectComponent";
import "./index.css";

function Subject() {
  return (
    <>
      <div style={{ outline: "none", minHeight: "100vh" }}>
        <ViewSubjectComponent SubjectName={"IOT"} Responsible={"Patrick"} Percentage={78}></ViewSubjectComponent>
        <ViewSubjectComponent SubjectName={"Projeto FullStack"} Responsible={"Cristian"} Percentage={48}></ViewSubjectComponent>
        <ViewSubjectComponent SubjectName={"Excell"} Responsible={"Queila"} Percentage={68}></ViewSubjectComponent>
        <ViewSubjectComponent SubjectName={"Python"} Responsible={"Queila"} Percentage={100}></ViewSubjectComponent>
        <ViewSubjectComponent SubjectName={"C#"} Responsible={"Trevisan"} Percentage={64}></ViewSubjectComponent>
      </div>
    </>
  );
}

export default Subject;
