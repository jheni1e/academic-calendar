import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/HomePage";
import NotFound from "../pages/NotFoundPage";
import Subject from "../pages/SubjectPage";
import Classes from "../pages/ClassesPage";
import Register from "../pages/RegisterPage";
import Semester from "../pages/SemesterPage";
import './index.css'
import Login from "../pages/LoginPage";

function WithHeader() {
  return (
    <>
      <div className="layout">
        <Header />

        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

function WithoutHeader() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default function AppRouter() {
  return (
    <Router basename="/calendario-academico">
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route element={<WithHeader />}>
          <Route path="/materias" element={<Subject />} />
          <Route path="/home" element={<Home />} />
          <Route path="/turmas" element={<Classes />} />
          <Route path="/semestre" element={<Semester />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
        <Route element={<WithoutHeader />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
