import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const Drawer = ({ open, setOpen, content }) => {
  // Slide-in and fade-in animations
  const slideIn = useSpring({
    transform: open ? "translateX(0)" : "translateX(100%)", // Slide in from the right (100% from the right)
  });

  const fade = useSpring({
    opacity: open ? 1 : 0,
  });

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    opacity: fade.opacity,
    transition: "opacity 0.3s ease",
  };

  const drawerStyle = {
    position: "fixed",
    top: 0,
    right: 0, // Position the drawer to the right of the screen
    width: "40%",
    height: "100%",
    backgroundColor: "#FFFF",
    color: "white",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    zIndex: 5000,
    transform: slideIn.transform,
    transition: "transform 0.3s ease",
  };

  return (
    <>
      <animated.div style={overlayStyle} onClick={() => setOpen(false)} />
      <animated.div style={drawerStyle}>{content}</animated.div>
    </>
  );
};

export default Drawer;
