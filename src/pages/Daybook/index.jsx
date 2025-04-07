import React from "react";
import BasicTable from "../../components/atoms/Table";
import { Avatar } from "@mui/material";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import { DateRangePicker } from "rsuite";
function Daybook() {
  const columns = [
    "Category",
    "Income",
    "Income Due",
    "Expense",
    "Expense Due",
    "Date",
  ];

  const rows = [
    {
      Category: "Admission",
      Income: "-",
      IncomeDue: "420000",
      Expense: "-",
      ExpenseDue: "390000",
      Date: "5/4/2025",
    },
    {
      Category: "Service Charge",
      Income: "25000",
      IncomeDue: "395000",
      Expense: "-",
      ExpenseDue: "390000",
      Date: "6/4/2025",
    },
    {
      Category: "Paid to College",
      Income: "-",
      IncomeDue: "395000",
      Expense: "5000",
      ExpenseDue: "385000",
      Date: "7/4/2025",
    },
    {
      Category: "Paid to Agent",
      Income: "-",
      IncomeDue: "395000",
      Expense: "10000",
      ExpenseDue: "375000",
      Date: "8/4/2025",
    },
  ];

  return (
    <div>
      <h2>Daybook</h2>
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
            width: "20%",
            display: "flex",
            flexDirection: "column",
            marginRight: "20px",
          }}
        >
          <label style={{ fontSize: "12px" }}>Select Date Range</label>
          <DateRangePicker size="lg" placeholder="-- / -- / ----" />
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label style={{ fontSize: "12px" }}>Select Branch</label>
          <select
            id="my-select"
            name="branch_id"
            style={{
              height: "41px",
              borderRadius: "5px",
              borderColor: "lightgray",
              fontSize: "14px",
            }}
          >
            {" "}
            <option value="1">All Branches</option>
            <option value="2">Mysore</option>
            <option value="3">Pulpalli</option>
            <option value="4">Sulthan Bathery</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "lightgreen",
            width: "150px",
            padding: "8px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Balance: <span style={{ fontWeight: "normal" }}>25000</span>
        </div>
        <div
          style={{
            backgroundColor: "lightblue",
            width: "150px",
            padding: "8px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Income: <span style={{ fontWeight: "normal" }}>25000</span>
        </div>
        <div
          style={{
            backgroundColor: "orange",
            width: "150px",
            padding: "8px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Expense: <span style={{ fontWeight: "normal" }}>25000</span>
        </div>
      </div>
      <BasicTable columns={columns} rows={rows} />
    </div>
  );
}

export default Daybook;
