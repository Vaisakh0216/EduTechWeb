import React, { useState } from "react";
import BasicTable from "../../components/atoms/Table";
import { Avatar } from "@mui/material";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import { DateRangePicker } from "rsuite";
import { useEffect } from "react";
import { getAllTransactions } from "../../services/getAllTransactions";
import { format } from "date-fns";
function Cashbook() {
  const columns = ["Category", "Credited", "Debited", "Date"];
  const [allTransactions, setAllTransactions] = useState([]);
  const [value, setValue] = useState(null);
  const [completeTransactions, setCompleteTransactions] = useState([]);

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

  console.log("the complete transaction", completeTransactions);

  const getTransactions = () => {
    const payload = {
      start_date: value?.length ? format(value[0], "dd-MM-yyyy") : "",
      end_date: value?.length ? format(value[1], "dd-MM-yyyy") : "",
    };
    getAllTransactions(payload).then((res) => {
      setCompleteTransactions(res?.data);
      setAllTransactions(
        res?.data?.map((item) => ({
          categoty: item?.description,
          credit:
            item?.type == "credit" ? (
              <span style={{ color: "green" }}>{item?.amount}</span>
            ) : (
              0
            ),
          debit:
            item?.type == "debit" ? (
              <span style={{ color: "red" }}>{item?.amount}</span>
            ) : (
              0
            ),
          date: item?.date,
        }))
      );
    });
  };

  useEffect(() => {
    getTransactions();
  }, [value]);

  const totalCredit = () => {
    return completeTransactions.reduce((sum, val) => {
      return val?.type === "credit" ? sum + Number(val?.amount || 0) : sum;
    }, 0);
  };

  const totalDebit = () => {
    return completeTransactions.reduce((sum, val) => {
      return val?.type === "debit" ? sum + Number(val?.amount || 0) : sum;
    }, 0);
  };

  return (
    <div>
      <h2>Cashbook</h2>
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
          <DateRangePicker
            size="lg"
            placeholder="-- / -- / ----"
            value={value}
            onChange={setValue}
          />
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
          Credited:{" "}
          <span style={{ fontWeight: "normal" }}>{totalCredit()}</span>
        </div>
        <div
          style={{
            backgroundColor: "red",
            width: "150px",
            padding: "8px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Debited: <span style={{ fontWeight: "normal" }}>{totalDebit()}</span>
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
          Balance:{" "}
          <span style={{ fontWeight: "normal" }}>
            {totalCredit() - totalDebit()}
          </span>
        </div>
      </div>
      <BasicTable columns={columns} rows={allTransactions} />
    </div>
  );
}

export default Cashbook;
