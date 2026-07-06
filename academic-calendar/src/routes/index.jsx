import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/HomePage";
import NotFound from "../pages/NotFoundPage";
import Subject from "../pages/SubjectPage";
import Register from "../pages/RegisterPage";
import Login from "../pages/LoginPage";

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
        <Route element={<WithHeader />}>
          <Route path="/materias" element={<Subject />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/group" element={ <Courses/>} />
          <Route path="/group/:eventId" element={ <Classes/>} /> */}
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
