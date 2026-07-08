import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/HomePage";
import NotFound from "../pages/NotFoundPage";
import Subject from "../pages/SubjectPage";
import Classes from "../pages/ClassesPage";
import Class from "../pages/ClassPage";
import Register from "../pages/RegisterPage";

function WithHeader() {
  return (
    <>
      <Header />
      <Outlet />
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
          <Route path="/turmas" element={<Classes/>} />
          {/* <Route path="/turmas/:name" element={<Class/>} /> */}
          {/* <Route path="/group" element={ <Courses/>} />
          <Route path="/group/:eventId" element={ <Classes/>} /> */}
          <Route path="/*" element={<NotFound />} />
        </Route>
        <Route element={<WithoutHeader />}>
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}
