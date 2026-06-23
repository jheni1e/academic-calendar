import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Toggle from "../Toggle";
import CircleChartItem from "../CircleChartItem";

const MenuSideBar = ({ onItemSelect, setSidebarHeight }) => {
  const [activeItem, setActiveItem] = useState("Pessoal");
  const color1 = "#19375E";
  const color2 = "#007BC0";

  const mockItems = [
    { id: 1, name: 'IoT', value: 40 },
    { id: 2, name: 'Python', value: 35 },
    { id: 3, name: 'Angular', value: 15 },
    { id: 4, name: 'Machine Learning', value: 10 },
  ];

  const handleToggleChange = () => {
    if (activeItem == "Pessoal") {
      setActiveItem("Turma")
    } else {
      setActiveItem("Pessoal")
    }
  }

  return (
    <div className={`divMenuSideBar`}>
      <div className="menuHeader">
        <Toggle id="sidebar-toggle" leftText="Pessoal" rightText="Turma" onChange={handleToggleChange} />
      </div>
      {mockItems.map((item) => {
        return (
          <div className="divItem">
            <CircleChartItem percentage={item.value} color1={color1} color2={color2} />
            <h2>{item.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default MenuSideBar;
