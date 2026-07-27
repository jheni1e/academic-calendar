import "./index.css";
import CircleChartItem from "../CircleChartItem"

function ViewSubjectComponent({ subjectName, responsible, studentClass, workload, completedWorkload }) {
  const percentage = workload ? (completedWorkload ?? 0) / workload * 100 : 0;

  return (
    <div className="component-container">
      <div className="subject-name">
        <h1 style={{ "fontSize": "2rem", "fontWeight": "600" }}>{subjectName}</h1>
        <h4 style={{ "color": "#858585", "fontWeight": "500" }}>{responsible}</h4>
      </div>
      <CircleChartItem percentage={percentage} color1={"gray"} color2={"black"}></CircleChartItem>
    </div>
  );
}

export default ViewSubjectComponent;
