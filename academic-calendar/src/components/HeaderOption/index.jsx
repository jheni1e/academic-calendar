import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const HeaderOption = ({ option, route }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="menu-option"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate("/" + route.toLowerCase())}>
      <h1 className="optionText">{option}</h1>
    </div>
  );
};

export default HeaderOption;
