import React, { forwardRef, useEffect, useState } from "react";
import HeaderOption from "../HeaderOption";
import "./index.css";

function Header() {

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
          <HeaderOption option="Calendário" route="home" />
          <HeaderOption option="Matérias" route="materias" />
          <HeaderOption option="Turmas" route="turmas" />
        </div>

        <div className="divLogo" />
      </div>
    </div>
  );
}

export default forwardRef(Header);
