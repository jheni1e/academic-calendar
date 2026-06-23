import "./index.css";
import { useState } from "react";

function CardClass({NameClass, InitialDate, EndDate, Responsible}) {
  return (
    <>
        <div className="container-card">
            <h1>{NameClass}</h1>
            <div className="text-gray">Inicio: {InitialDate}</div>
            <div className="text-gray">Final: {EndDate}</div>
            <div className="text-black">Reponsavel: {Responsible}</div>
        </div>
    </>
  );
}

export default CardClass ;
