import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { format } from "date-fns";
import { IconButton } from "@mui/material";

const formatDateTime = (date) => {
  return format(date, "yyyy-MM-dd hh:mm:ss");
};

const Timer = ({
  loopDuration = 60,
  setStartTime,
  setEndTime,
  isDisabled,
  startTime,
  endTime,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [callTimeStart, setCallTimeStart] = useState(null);
  const [callTimeEnd, setCallTimeEnd] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const percentage = ((seconds % loopDuration) / loopDuration) * 100;

  const startTimer = () => {
    setSeconds(0);
    setIsRunning(true);
    setCallTimeStart(formatDateTime(new Date()));
    setStartTime(formatDateTime(new Date()));
  };

  const stopTimer = () => {
    setIsRunning(false);
    setCallTimeEnd(formatDateTime(new Date()));
    setEndTime(formatDateTime(new Date()));
    // setSeconds(0);
  };

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const secondsDiff = Math.floor((end - start) / 1000);

      setSeconds(secondsDiff >= 0 ? secondsDiff : 0);
    }
  }, [startTime, endTime]);

  return (
    <div style={{ width: 200, margin: "0 auto" }}>
      <CircularProgressbar
        value={percentage}
        text={`${seconds}s`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#00bfa6",
          trailColor: "#e0e0e0",
        })}
      />
      <div
        style={{
          marginTop: 20,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            backgroundColor: "green",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={startTimer}
            disabled={isDisabled}
            style={{ backgroundColor: isDisabled ? "gray" : "green" }}
          >
            <PhoneIcon style={{ color: "white", cursor: "pointer" }} />
          </IconButton>
        </div>
        <div
          style={{
            backgroundColor: "red",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={stopTimer}
            disabled={isDisabled}
            style={{ backgroundColor: isDisabled ? "gray" : "" }}
          >
            <PhoneDisabledIcon style={{ color: "white", cursor: "pointer" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Timer;
