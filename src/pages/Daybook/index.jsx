import React, { useState } from "react";
import BasicTable from "../../components/atoms/Table";
import { Avatar, Button, TextField } from "@mui/material";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import { DateRangePicker } from "rsuite";
import { useEffect } from "react";
import { format } from "date-fns";
import { getAllCategories } from "../../services/getAllCategories";
import DatePicker from "react-datepicker";
import { createTransaction } from "../../services/createTransaction";
import { getAllDaybookTransactions } from "../../services/getAllDaybookTransactions";

function Daybook() {
  const columns = [
    "Category",
    "Income",
    "Income Due",
    "Expense",
    "Expense Due",
    "Date",
  ];
  const [allTransactions, setAllTransactions] = useState([]);
  const [completeTransactions, setCompleteTransactions] = useState([]);
  const [value, setValue] = useState(null);
  const [allCategories, setAllCategories] = useState();
  const [dateOfPayment, setDateOfPayment] = useState();
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const [amount, setAmount] = useState();
  const [mode, setMode] = useState();

  const getTransactions = () => {
    const payload = {
      start_date: value?.length ? format(value[0], "dd-MM-yyyy") : "",
      end_date: value?.length ? format(value[1], "dd-MM-yyyy") : "",
    };
    getAllDaybookTransactions(payload).then((res) => {
      console.log("the result", res);
      setCompleteTransactions(res?.data);
      setAllTransactions(
        res?.data?.map((item) => ({
          categoty: item?.category,
          income: <span style={{ color: "green" }}>{item?.income}</span>,
          incomeDue: item?.income_due,
          expense: <span style={{ color: "red" }}>{item?.expense}</span>,
          expenseDue: item?.expense_due < 0 ? 0 : item?.expense_due,
          date: item?.date,
        }))
      );
    });
  };

  useEffect(() => {
    getTransactions();
  }, [value]);

  useEffect(() => {
    getAllCategories().then((res) => {
      setAllCategories(res);
    });
  }, []);

  const totalIncome = () => {
    return completeTransactions.reduce((sum, val) => {
      return sum + Number(val?.income);
    }, 0);
  };

  const totalExpense = () => {
    return completeTransactions.reduce((sum, val) => {
      return sum + Number(val?.expense);
    }, 0);
  };

  const saveTransaction = () => {
    const payload = {
      type: "debit",
      category: selectedCategory?.name,
      description: "-",
      transaction_date: format(dateOfPayment, "yyyy-MM-dd"),
      reference_id: "",
      amount: amount,
      mode_of_payment: mode,
      category_id: selectedCategory?.id,
      branch_id: 1,
    };

    console.log("the payload", payload);

    createTransaction(payload).then((res) => {
      getTransactions();
      setAmount("");
      setDateOfPayment();
      setSelectedCategory({});
    });
  };

  console.log("the", selectedCategory);

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
            padding: "8px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Total Income:{" "}
          <span style={{ fontWeight: "normal" }}>{totalIncome()}</span>
        </div>
        <div
          style={{
            backgroundColor: "orange",
            padding: "8px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Total Expense:{" "}
          <span style={{ fontWeight: "normal" }}>{totalExpense()}</span>
        </div>
        <div
          style={{
            backgroundColor: "lightblue",
            padding: "8px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Balance:{" "}
          <span style={{ fontWeight: "normal" }}>
            {totalIncome() - totalExpense()}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "60%",
          gap: "10px",
          margin: "20px 0px",
        }}
      >
        <select
          id="my-select"
          style={{
            borderRadius: "8px",
            border: "1px solid lightgray",
            padding: "10px",
            fontSize: "14px",
            height: "45px",
          }}
          value={selectedCategory.id}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedCat = allCategories?.find(
              (cat) => cat.id == selectedId
            );
            setSelectedCategory({
              id: selectedCat?.id || "",
              name: selectedCat?.name || "",
            });
          }}
        >
          <option value="">Select Category</option>
          {allCategories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          id="my-select"
          name="mode"
          style={{
            height: "45px",
            borderRadius: "8px",
            border: "1px solid lightgray",
          }}
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="">Select Payment Mode</option>
          <option value="Cash">Cash</option>
          <option value="Gpay">Gpay</option>
          <option value="Check">Check</option>
        </select>
        <DatePicker
          className="transaction"
          selected={dateOfPayment}
          onChange={(date) => setDateOfPayment(date)}
          placeholderText="date"
        />
        <TextField
          id="outlined-basic"
          name="amount"
          label="amount"
          variant="outlined"
          sx={{
            "& .MuiInputBase-root": {
              height: "45px",
              borderRadius: "8px",
              backgroundColor: "white",
            },
            "& .MuiInputLabel-root": {
              top: "-5px",
              fontSize: "14px",
            },
          }}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          variant="contained"
          style={{
            height: "45px",
            borderRadius: "8px",
            textTransform: "inherit",
          }}
          onClick={() => saveTransaction()}
        >
          Save
        </Button>
      </div>
      <BasicTable columns={columns} rows={allTransactions} />
    </div>
  );
}

export default Daybook;
