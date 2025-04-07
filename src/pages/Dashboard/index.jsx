import { Grid2 } from "@mui/material";
import React from "react";
import Income from "./Income";
import AdmissionTotal from "./Admissions";
import TotalExpense from "./Expense";
import Net from "./NetProfit";
import InflationChart from "./AdmissionBars";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/DateRangePicker/styles/index.css";
import FinancialOverview from "./FinancialOverview";

function Dashboard() {
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
          marginBottom: "20px",
          display: "flex",
          width: "100%",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label style={{ fontSize: "14px" }}>Select Branch</label>
          <select
            id="my-select"
            name="branch_id"
            style={{
              height: "41px",
              borderRadius: "8px",
              borderColor: "lightgray",
            }}
          >
            {" "}
            <option value="1">All Branches</option>
            <option value="2">Mysore</option>
            <option value="3">Pulpalli</option>
            <option value="4">Sulthan Bathery</option>
          </select>
        </div>
        <div
          style={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            marginLeft: "20px",
          }}
        >
          <label style={{ fontSize: "14px" }}>Select Date Range</label>
          <DateRangePicker size="lg" />
        </div>
      </div>
      <Grid2 container spacing={5}>
        <Grid2 lg={3} sm={6} xs={12}>
          <Income />
        </Grid2>
        <Grid2 lg={3} sm={6} xs={12}>
          <AdmissionTotal />
        </Grid2>
        <Grid2 lg={3} sm={6} xs={12}>
          <TotalExpense />
        </Grid2>
        <Grid2 lg={3} sm={6} xs={12}>
          <Net />
        </Grid2>
        <Grid2 lg={8} xs={12}>
          <InflationChart />
        </Grid2>
        <Grid2 lg={4} md={6} xs={12}>
          <FinancialOverview />
        </Grid2>
      </Grid2>
    </div>
  );
}

export default Dashboard;
