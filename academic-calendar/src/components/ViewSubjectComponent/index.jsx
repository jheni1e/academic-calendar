import "./index.css";
import CircleChartItem from "../CircleChartItem"
import { useState } from "react";

function ViewSubjectComponent({SubjectName, Responsible, Class, Percentage, ...rest}) {
  return (
    <>
      <div className="component-container" {...rest}>
        <div className="subject-name">
            <h1>{SubjectName} - {Class}</h1>
            <h4>{Responsible}</h4>
        </div>
        <CircleChartItem percentage={Percentage} color1={"gray"} color2={"black"}></CircleChartItem>
      </div>
    </>
  );
}

export default ViewSubjectComponent;
