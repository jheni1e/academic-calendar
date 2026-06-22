import "./index.css";
import CircleChartItem from "../CircleChartItem"

function ViewSubjectComponent({SubjectName, Responsible, Percentage}) {
  return (
    <>
      <div className="component-container">
        <div>
            <h1>{SubjectName}</h1>
            <h4>{Responsible}</h4>
        </div>
        <CircleChartItem percentage={Percentage} color1={"gray"} color2={"black"}></CircleChartItem>
      </div>
    </>
  );
}

export default ViewSubjectComponent;
