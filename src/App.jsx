import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/index";
import ResponsiveDrawer from "./components/organisms/Layout";
import "./App.css";
import College from "./pages/Admission/College";
import Course from "./pages/Admission/Course";
import Payment from "./pages/Payment/index";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Agents from "./pages/Admission/Agents";
import Daybook from "./pages/Daybook";
import Cashbook from "./pages/Cashbook";
import AgentDetail from "./pages/Admission/Agents/agentDetail";
import Onboard from "./pages/Admission/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ResponsiveDrawer />}>
          <Route element={<PrivateRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Admission" element={<Onboard />} />
            <Route path="/College" element={<College />} />
            <Route path="/Course" element={<Course />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Agent" element={<Agents />} />
            <Route path="/Agent/:id" element={<AgentDetail />} />
            <Route path="/Daybook" element={<Daybook />} />
            <Route path="/Cashbook" element={<Cashbook />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
