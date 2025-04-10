import { colors } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomAccordion = () => {
  // State to track the open/close status of each accordion item
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  // Function to handle the toggling of each accordion
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const headerStyle = {
    color: "white",
    cursor: "pointer",
    textAlign: "left",
  };

  const nestedListStyle = {
    paddingLeft: "20px",
    marginTop: "20px",
  };

  const listItemStyle = {
    padding: "8px",
    fontSize: "16px",
    cursor: "pointer",
    width: "full",
    color: "white",
  };

  return (
    <div>
      <div style={headerStyle} onClick={() => handleToggle(0)}>
        Admission
      </div>
      {openIndex === 0 && (
        <div style={nestedListStyle}>
          <div
            style={listItemStyle}
            onClick={() => {
              navigate("/Onboard");
              console.log("Clicking onbaord");
            }}
          >
            Student
          </div>
          <div
            style={listItemStyle}
            onClick={() => {
              navigate("/College");
            }}
          >
            College
          </div>
          <div
            style={listItemStyle}
            onClick={() => {
              navigate("/Course");
            }}
          >
            Course
          </div>
          <div
            style={listItemStyle}
            onClick={() => {
              navigate("/Agent");
            }}
          >
            Agent
          </div>
          <div style={listItemStyle} onClick={() => handleToggle(1)}></div>
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
