import { Alert, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertShow, setAlertShow] = useState(false);

  const login = async () => {
    const credential = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        "https://admission-api.v-nexus.com/api/login",
        credential
      );
      console.log(res.data);
      localStorage.setItem("authToken", res?.data?.token);
      navigate("/Dashboard");
    } catch (error) {
      setAlertShow(true);
      console.error("Error during login request:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertShow(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [alertShow]);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          right: 0,
        }}
      >
        {alertShow && (
          <Alert variant="filled" severity="error">
            Invalid Credentials!
          </Alert>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            backgroundColor: "#031C30",
            borderRadius: "20px",
            padding: "48px 72px",
          }}
        >
          <h3 style={{ color: "white" }}>Login to your account</h3>
          <div>
            <label style={{ color: "white", fontSize: "14px" }}>Email</label>
            <TextField
              sx={{
                width: "100%",
                zIndex: "0",
                marginTop: "5px",
                "& .MuiInputBase-root": {
                  height: "45px",
                  borderRadius: "8px",
                  border: "1px solid gray",
                  color: "white",
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root": {
                  top: "-5px",
                  fontSize: "14px",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "gray",
                  fontSize: "13px",
                  opacity: 0.7,
                },
              }}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label style={{ color: "white", fontSize: "14px" }}>Password</label>
            <TextField
              placeholder="Enter your password"
              sx={{
                width: "100%",
                zIndex: "0",
                marginTop: "5px",
                "& .MuiInputBase-root": {
                  height: "45px",
                  borderRadius: "8px",
                  border: "1px solid gray",
                  color: "white",
                  fontSize: "14px",
                },
                "& .MuiInputLabel-root": {
                  top: "-5px",
                  fontSize: "14px",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "gray",
                  fontSize: "13px",
                  opacity: 0.7,
                },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button
              style={{
                backgroundColor: "#1570EF",
                color: "white",
                width: "100%",
                textTransform: "inherit",
                cursor: "pointer",
              }}
              onClick={() => login()}
            >
              Login Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
