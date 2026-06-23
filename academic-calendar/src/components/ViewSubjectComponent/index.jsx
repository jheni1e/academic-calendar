import "./index.css";
import CircleChartItem from "../CircleChartItem"
import { useState } from "react";
import ViewSubjectModal from "../ViewSubjectModal";

function ViewSubjectComponent({SubjectName, Responsible, Class, Percentage}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <div className="component-container" onClick={() => setIsModalOpen(true)}>
        {isModalOpen &&
          <ViewSubjectModal></ViewSubjectModal>
        }
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
