import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResponsiveDrawer from "./components/organisms/Layout";
import "./App.css";
import Onboard from "./pages/Admission/Onboard";
import College from "./pages/Admission/College";
import Course from "./pages/Admission/Course";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveDrawer>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Onboard" element={<Onboard />} />
          <Route path="/College" element={<College />} />
          <Route path="/Course" element={<Course />} />
        </Routes>
      </ResponsiveDrawer>
    </BrowserRouter>
  );
}

export default App;
