import BoschButton from "../../components/BoschButton";
import CardClass from "../../components/CardClass";
import "./index.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Class() {
  const { name } = useParams();

  return (
    <>
        <div className="container-page">
          <h1>{name}</h1>
        </div>
    </>
  );
}

export default Class;
