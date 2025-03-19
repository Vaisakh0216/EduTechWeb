import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const login = async () => {
    const credential = {
      email: "vishnuvwdrs@gmail.com",
      password: "12345",
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
      console.error("Error during login request:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Button
        variant="contained"
        style={{ height: "50px" }}
        onClick={() => login()}
      >
        login
      </Button>
    </div>
  );
}

export default Login;
