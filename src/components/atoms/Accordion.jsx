import { colors } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomAccordion = ({ mainMenus, subMenus }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const headerStyle = {
    color: "black",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "500",
  };

  const nestedListStyle = {
    paddingLeft: "20px",
    marginTop: "20px",
  };

  const listItemStyle = {
    padding: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    width: "full",
    color: "black",
  };

  return (
    <div>
      <div style={headerStyle} onClick={() => handleToggle(0)}>
        {mainMenus}
      </div>
      {openIndex === 0 && (
        <div style={nestedListStyle}>
          {subMenus?.map((menus) => (
            <div
              style={listItemStyle}
              onClick={() => {
                navigate(`/${menus}`);
              }}
            >
              {menus}
            </div>
          ))}
          {/* <div
            style={listItemStyle}
            onClick={() => {
              navigate("/Admission");
            }}
          >
            Admission
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
          </div> */}
          <div style={listItemStyle} onClick={() => handleToggle(1)}></div>
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
