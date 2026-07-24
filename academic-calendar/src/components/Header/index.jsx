import React, { forwardRef, useEffect, useState } from "react";
import HeaderOption from "../HeaderOption";
import "./index.css";
import { getData } from "../../utils/apiBack";

function Header() {
  const [userName, setUserName] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    initUserInfo();
  }, []);

  const initUserInfo = async () => {
    const edv = sessionStorage.getItem("user");
    const user = await getData(`/user/edv/${edv}`);
    const userName = user.user.name;

    setUserName(userName);

    setIsInstructor(user.user.role === "ADMIN" || user.user.role === "INSTRUCTOR");
  }

  return (
    <div className="header">
      <div className="divSupergraphic" />

      <div className="divHeaderElements">
        <div className="divLogo" />

        <div className="divHeaderOptions">
          <HeaderOption option="Calendário" route="home" />
          {isInstructor && (<>
            <HeaderOption option="Matérias" route="materias" />
            <HeaderOption option="Planejamento" route="planejamento" />
          </>)}
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
