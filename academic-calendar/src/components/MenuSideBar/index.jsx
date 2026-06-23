import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import Toggle from "../Toggle";
import CircleChartItem from "../CircleChartItem";
import CheckBox from "../CheckBox";
import DropdownList from "../DropdownList";

const MenuSideBar = ({
  items,
  option1,
  option2,
  hasToggle,
  hasItems,
  hasDropDown,
  LabelDropDown,
  OptionsDropDown,
  selectedValueDrop,
  onDropDownChange,
  hasCheckbox }) => {

  const [activeItem, setActiveItem] = useState(option1);
  const color1 = "#19375E";
  const color2 = "#007BC0";
  const [eventsFilter, setEventsFilter] = useState(false);
  const [classesFilter, setClassesFilter] = useState(false);

  const handleToggleChange = () => {
    if (activeItem == option1) {
      setActiveItem(option2)
    } else {
      setActiveItem(option1)
    }
  }

  return (
    <div className={`divMenuSideBar`}>
      <div className="menuHeader">
        {hasToggle &&
          <Toggle leftText={option1} rightText={option2} onChange={handleToggleChange} />
        }
      </div>
      {hasDropDown &&
        <div style={{ width: "220px", marginLeft: "12%" }}>
          <DropdownList
            label={LabelDropDown}
            options={OptionsDropDown}
            selectedValue={selectedValueDrop}
            onChange={onDropDownChange}
          />
        </div>
      }
      {hasItems &&
        items.map((item) => {
          return (
            <div className="divItem">
              <CircleChartItem percentage={item.value} color1={color1} color2={color2} />
              <h2>{item.name}</h2>
            </div>
          );
        })}
      {hasCheckbox &&
        <div className="checkboxWrapper">
          <div className="divCheckbox">
            <CheckBox isChecked={eventsFilter} onCheckboxChange={() => setEventsFilter(!eventsFilter)} />
            <h4>Eventos</h4>
          </div>
          <div className="divCheckbox">
            <CheckBox isChecked={classesFilter} onCheckboxChange={() => setClassesFilter(!classesFilter)} />
            <h4>Aulas</h4>
          </div>
        </div>}
    </div>
  );
};

export default MenuSideBar;
