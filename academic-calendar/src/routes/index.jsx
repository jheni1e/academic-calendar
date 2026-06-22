import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/HomePage";
import NotFound from "../pages/NotFoundPage";
import Subject from "../pages/SubjectPage";

export default function AppRouter() {
  return (
    <Router basename="/calendario-academico">
      <Header />
      <Routes>
        <Route path="/materias" element={<Subject/>} />
        <Route path="/home" element={<Home/>} />
        {/* <Route path="/group" element={ <Courses/>} />
        <Route path="/group/:eventId" element={ <Classes/>} /> */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
