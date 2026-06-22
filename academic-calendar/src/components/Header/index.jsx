import React, { forwardRef, useEffect, useState } from "react";
import HeaderOption from "../HeaderOption";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Header() {
  const navigate = useNavigate();

  const handleClick = (option) => {
    let page = "";
    if (option.page) {
      page = option.page;
    } else {
      page = option.name.toLowerCase().replace(/\s+/g, "");
    }
    navigate("/" + page);
  };

  return (
    <div className="header">
      <div className="divSupergraphic" />

      <div className="divHeaderElements">
        <div className="divUser" />

        <div className="divHeaderOptions">
          <HeaderOption option="Calendário" onClick={() => navigate("/home")} />
          <HeaderOption option="Matérias" onClick={() => navigate("/courses")} />
          <HeaderOption option="Turmas" onClick={() => navigate("/classes")} />
        </div>

        <div className="divLogo" />
      </div>
    </div>
  );
}

export default forwardRef(Header);
