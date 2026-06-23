import CardClass from "../../components/CardClass";
import "./index.css";
import { useState } from "react";

function Classes() {
  
  const classes = [
    {name: "DTA", reponsible: "Queila Lima", initial: "03/02/2025", end: "03/08/2025"},
    {name: "Analise", reponsible: "Queila Lima", initial: "03/08/2025", end: "10/12/2026"},
    {name: "Manufatura", reponsible: "Gabriel Bernadelli",  initial: "03/08/2025", end: "10/12/2026"}
  ]
  return (
    <>
      {classes.map((classe)=> (
        <CardClass NameClass={classe.name} Responsible={classe.reponsible} InitialDate={classe.initial} EndDate={classe.end}></CardClass>
      ))}
    </>
  );
}

export default Classes ;
