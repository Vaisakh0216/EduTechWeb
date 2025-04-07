import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import ResponsiveDrawer from "./components/organisms/Layout";
import "./App.css";
import Onboard from "./pages/Admission/Onboard";
import College from "./pages/Admission/College";
import Course from "./pages/Admission/Course";
import Payment from "./pages/Payment/index";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Agents from "./pages/Admission/Agents";
import Daybook from "./pages/Daybook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ResponsiveDrawer />}>
          <Route element={<PrivateRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Onboard" element={<Onboard />} />
            <Route path="/College" element={<College />} />
            <Route path="/Course" element={<Course />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Agent" element={<Agents />} />
            <Route path="/Daybook" element={<Daybook />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
