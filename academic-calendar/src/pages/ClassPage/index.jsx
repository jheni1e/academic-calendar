import BoschButton from "../../components/BoschButton";
import CardClass from "../../components/CardClass";
import BarChart from "../../components/BarChart"
import "./index.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Class() {
  const { name } = useParams();
  const classes = [
    {nickname: "dta", name: "Digital Talent Academy 3", reponsible: "Queila Lima", initial: "03/02/2025", end: "03/08/2026", students: [
      {name: "Anna Guerra", performance: 70.5},
      {name: "Bruna Eloha", performance: 80.4},
      {name: "Fernanda Fialho", performance: 91.5},
      {name: "Heloise Fachinelo", performance: 69.8},
      {name: "Jhenifer Halma", performance: 75.5},
      {name: "Joyce Vasco", performance: 82.3},
      {name: "Julia Caroline", performance: 79.5},
      {name: "Anna Guerra", performance: 70.5},
      {name: "Bruna Eloha", performance: 80.4},
      {name: "Fernanda Fialho", performance: 91.5},
      {name: "Heloise Fachinelo", performance: 69.8},
      {name: "Jhenifer Halma", performance: 75.5},
      {name: "Joyce Vasco", performance: 82.3},
      {name: "Julia Caroline", performance: 79.5},
      {name: "Joyce Vasco", performance: 82.3},
      {name: "Joyce Vasco", performance: 82.3},
    ]},
    {nickname: "add", name: "Analise de Dados 2", reponsible: "Queila Lima", initial: "03/08/2025", end: "10/12/2026", students: [
      {name: "Anna Guerra", performance: 70.5},
      {name: "Bruna Eloha", performance: 80.4},
      {name: "Fernanda Fialho", performance: 91.5},
      {name: "Heloise Fachinelo", performance: 69.8},
      {name: "Jhenifer Halma", performance: 75.5},
      {name: "Joyce Vasco", performance: 82.3},
      {name: "Julia Caroline", performance: 79.5},
      {name: "Anna Guerra", performance: 70.5},
      {name: "Bruna Eloha", performance: 80.4},
      {name: "Fernanda Fialho", performance: 91.5},
      {name: "Heloise Fachinelo", performance: 69.8},
      {name: "Jhenifer Halma", performance: 75.5},
      {name: "Joyce Vasco", performance: 82.3},
      {name: "Julia Caroline", performance: 79.5},
      {name: "Joyce Vasco", performance: 82.3},
      {name: "Joyce Vasco", performance: 82.3},
    ]},
    {nickname: "man", name: "Manufatura Avançada", reponsible: "Gabriel Bernadelli",  initial: "03/08/2025", end: "10/12/2026", students: [
      {name: "Anna Guerra", performance: 70.5},
      {name: "Bruna Eloha", performance: 80.4},
      {name: "Fernanda Fialho", performance: 91.5},
      {name: "Heloise Fachinelo", performance: 69.8},
      {name: "Jhenifer Halma", performance: 75.5},
      {name: "Joyce Vasco", performance: 82.3},
      {name: "Julia Caroline", performance: 79.5},
      {name: "Anna Guerra", performance: 70.5},
      {name: "Bruna Eloha", performance: 80.4},
      {name: "Fernanda Fialho", performance: 91.5},
      {name: "Heloise Fachinelo", performance: 69.8},
      {name: "Jhenifer Halma", performance: 75.5},
      {name: "Joyce Vasco", performance: 82.3},
      {name: "Julia Caroline", performance: 79.5},
      {name: "Joyce Vasco", performance: 82.3},
      {name: "Joyce Vasco", performance: 82.3},
    ]}
  ]

  const classInfo = classes.find(cl => cl.nickname === name)
  return (
    <>
        <div className="container-page">
          <div className="container-title">
            <div className="title">
              {classInfo.name}
            </div>
            <div className="sub-title">
              {classInfo.reponsible}
            </div>
          </div>
          <div className="container-duration">
            <div className="sub-title">
              Inicio: {classInfo.initial}
            </div>
            <div className="sub-title">
              Final: {classInfo.end}
            </div>
          </div>
          <div className="container-graphic">
            <BarChart data={classInfo.students} xKey={"name"} yKey={"performance"} cor="blue"></BarChart>
          </div>
          <div className="line"></div>
        </div>
    </>
  );
}

export default Class;
