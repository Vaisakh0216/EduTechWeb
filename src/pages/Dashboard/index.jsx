import { Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import Income from "./Income";
import AdmissionTotal from "./Admissions";
import TotalExpense from "./Expense";
import Net from "./NetProfit";
import InflationChart from "./AdmissionBars";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/DateRangePicker/styles/index.css";
import FinancialOverview from "./FinancialOverview";
import { getDashData } from "../../services/getDashboardData,js";
import PieChart from "./FinancialOverview";
import LineChart from "./AdmissionBars";
import AreaChart from "./AdmissionBars";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState();
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const payload = {
      start_date: "",
      end_date: "",
      branch_id: 1,
    };
    getDashData(payload).then((res) => {
      setDashboardData(res);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "50%" }}>
          <h1
            style={{
              fontWeight: "500",
              fontSize: "35px",
              padding: 0,
              margin: 0,
            }}
          >
            {"Hi"} {userData?.name}
          </h1>
          <span style={{ color: "#898989" }}>Welcome Back</span>
        </div>
        <div
          style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}
        ></div>
      </div>
      <Grid2 container spacing={2} sx={{ marginTop: "50px" }}>
        <Income />
        <AdmissionTotal />
        <TotalExpense />
        <Net />
      </Grid2>
      <Grid2 container spacing={2} sx={{ marginTop: "15px" }}>
        <PieChart title="Admissions on Each Days" subtitle="2025" />
        <AreaChart title="Profit Range" subtitle="2025" width={450} />
      </Grid2>
    </div>
  );
}

export default Dashboard;
