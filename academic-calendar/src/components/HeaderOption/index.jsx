import React, { useState, useEffect } from "react";
import "./index.css";

const HeaderOption = ({ option, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCurrentOption, setIsCurrentOption] = useState(false);

  const handleOptionClick = () => {
    console.log("handleOptionClick");
    onClick({ name: option });
  };

  return (
    <div
      className="menu-option"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => ({ name: option, page: option.toLowerCase() })}
    >
      <h1 className="optionText">{option}</h1>
    </div>
  );
};

export default HeaderOption;
