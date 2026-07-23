import React, { forwardRef, useEffect, useState } from "react";
import HeaderOption from "../HeaderOption";
import "./index.css";
import { getData } from "../../utils/apiBack";

function Header() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    initUserInfo();
  }, []);

  const initUserInfo = async () => {
    const edv = localStorage.getItem("user");
    const user = await getData(`/user/edv/${edv}`);
    const userName = user.user.name;

    setUserName(userName);
  }

  return (
    <div className="header">
      <div className="divSupergraphic" />

      <div className="divHeaderElements">
        <div className="divLogo" />

        <div className="divHeaderOptions">
          <HeaderOption option="Calendário" route="home" />
          <HeaderOption option="Matérias" route="materias" />
          <HeaderOption option="Planejamento" route="planejamento" />
        </div>

        <div className="divUser">
          <div className="userIcon" />
          <span className="txtUserName">{userName}</span>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Header);
