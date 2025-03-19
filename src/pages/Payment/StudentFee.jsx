import React, { useEffect, useState } from "react";
import BasicTable from "../../components/atoms/Table";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import Drawer from "../../components/atoms/Drawer";
import { Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function StudentFee() {
  const [open, setOpen] = useState(false);
  const [studentFee, setStudentFee] = useState(0);
  const [collegeFee, setCollegeFee] = useState(0);
  const [transactionRow, setTransactionRow] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState({
    amount: "",
    description: "",
    ref: "",
    status: "Paid",
  });
  const [totalFee, setTotalFee] = useState(200000);

  const [admissionNo, setAdmissionNo] = useState("");
  const columns = [
    "Admission Number",
    "Student Name",
    "College Name",
    "Date",
    "Course",
    "Action",
  ];
  const rows = [
    {
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
  ];

  const TransactionHead = ["Transaction Id", "Description", "Amount", "Status"];
  const TransactionRows = [
    {
      sn: "1",
      TransactionId: "UPI12345678",
      Description: "Payment received through Google Pay",
      Amount: "20000",
      Status: "Paid",
    },
  ];

  // const addTransaction = () => {
  //   // setTransactionRow((prev) => [
  //   //   ...prev,
  //   //   {
  //   //     sn: "",
  //   //     TransactionId: "",
  //   //     Description: "",
  //   //     Amount: "",
  //   //     Status: "",
  //   //   },
  //   // ]);
  // };

  const saveTransation = () => {
    setTransactionRow((prev) => [...prev, transactionDetail]);
  };

  const getDetail = (val) => {
    console.log("this is val", val);
    setOpen(true);
    setAdmissionNo(val);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("the details", transactionRow, transactionDetail);

  useEffect(() => {
    if (transactionRow.length) {
      setStudentFee(
        parseFloat(transactionRow[transactionRow.length - 1]?.amount || 0) +
          parseFloat(studentFee || 0)
      );
    }
  }, [transactionRow]);

  return (
    <div>
      <BasicTable columns={columns} rows={rows} onClickFunction={getDetail} />
      {open && (
        <Drawer
          width="50%"
          open={open}
          setOpen={setOpen}
          content={
            <div style={{ color: "black", overflowY: "scroll" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  borderBottom: "1px solid gray",
                }}
              >
                <h3>Student Fee Tracking</h3>
                <ClearIcon onClick={() => setOpen(false)} />
              </div>
              <div style={{ padding: "15px" }}>
                <div
                  style={{
                    border: "1px solid gray",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        width: "30%",
                        backgroundColor: "lightgray",
                        padding: 5,
                      }}
                    >
                      Admission Number:
                    </span>
                    <span
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        marginLeft: "10px",
                        width: "70%",
                        padding: 5,
                      }}
                    >
                      {admissionNo}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        width: "30%",
                        backgroundColor: "lightgray",
                        padding: 5,
                      }}
                    >
                      Total Fee:
                    </span>
                    <span
                      style={{
                        fontWeight: "normal",
                        fontSize: "14px",
                        marginLeft: "10px",
                        width: "70%",
                        padding: 5,
                      }}
                    >
                      {totalFee}
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "50px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      gap: "5px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        backgroundColor: "lightgray",
                        padding: "4px",
                      }}
                    >
                      From Collected From Student:
                    </h3>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        padding: `${
                          totalFee === studentFee ? "5px 10px" : "4px"
                        }`,
                        color: `${totalFee === studentFee ? "white" : "black"}`,
                        backgroundColor: `${
                          totalFee === studentFee ? "lightgreen" : ""
                        }`,
                        borderRadius: `${totalFee === studentFee ? "5px" : ""}`,
                      }}
                    >
                      {totalFee === studentFee ? "Paid" : studentFee}
                    </h3>
                  </div>
                </div>
                <div style={{ border: "1px solid gray", padding: "5px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      Paid By Student
                    </h3>
                  </div>
                  <Stack style={{}}>
                    <BasicTable
                      columns={TransactionHead}
                      rows={transactionRow}
                      onClickFunction={getDetail}
                    />
                    {studentFee != totalFee && (
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          marginTop: "10px",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          name="ref"
                          label="Transation Ref"
                          variant="outlined"
                          autoComplete="off"
                          style={{ width: "100%" }}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "50px",
                              borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                              top: "-2px",
                              fontSize: "14px",
                            },
                          }}
                          onChange={(e) => handleChange(e)}
                        />
                        <TextField
                          id="outlined-basic"
                          name="description"
                          label="Description"
                          variant="outlined"
                          autoComplete="off"
                          style={{ width: "100%" }}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "50px",
                              borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                              top: "-2px",
                              fontSize: "14px",
                            },
                          }}
                          onChange={(e) => handleChange(e)}
                        />
                        <TextField
                          id="outlined-basic"
                          name="amount"
                          label="Amount"
                          variant="outlined"
                          autoComplete="off"
                          style={{ width: "100%" }}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "50px",
                              borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                              top: "-2px",
                              fontSize: "14px",
                            },
                          }}
                          onChange={(e) => handleChange(e)}
                        />
                        <Button
                          variant="contained"
                          style={{
                            height: "50px",
                            borderRadius: "8px",
                            textTransform: "inherit",
                          }}
                          onClick={() => saveTransation()}
                        >
                          Save
                        </Button>
                      </div>
                    )}
                  </Stack>
                </div>
                <div style={{ marginTop: "50px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      gap: "5px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        backgroundColor: "lightgray",
                        padding: "4px",
                      }}
                    >
                      From Collected From Student:
                    </h3>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        padding: "4px",
                      }}
                    >
                      {totalFee === studentFee ? "Paid Completely" : studentFee}
                    </h3>
                  </div>
                  <div style={{ border: "1px solid gray", padding: "5px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      <h3 style={{ fontSize: "16px" }}>Paid To College</h3>
                    </div>
                    <Stack style={{}}>
                      <BasicTable
                        columns={TransactionHead}
                        rows={transactionRow}
                        onClickFunction={getDetail}
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          marginTop: "10px",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          name="ref"
                          label="Transation Ref"
                          variant="outlined"
                          autoComplete="off"
                          style={{ width: "100%" }}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "50px",
                              borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                              top: "-2px",
                              fontSize: "14px",
                            },
                          }}
                          onChange={(e) => handleChange(e)}
                        />
                        <TextField
                          id="outlined-basic"
                          name="description"
                          label="Description"
                          variant="outlined"
                          autoComplete="off"
                          style={{ width: "100%" }}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "50px",
                              borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                              top: "-2px",
                              fontSize: "14px",
                            },
                          }}
                          onChange={(e) => handleChange(e)}
                        />
                        <TextField
                          id="outlined-basic"
                          name="amount"
                          label="Amount"
                          variant="outlined"
                          autoComplete="off"
                          style={{ width: "100%" }}
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "50px",
                              borderRadius: "8px",
                            },
                            "& .MuiInputLabel-root": {
                              top: "-2px",
                              fontSize: "14px",
                            },
                          }}
                          onChange={(e) => handleChange(e)}
                        />
                        <Button
                          variant="contained"
                          style={{
                            height: "50px",
                            borderRadius: "8px",
                            textTransform: "inherit",
                          }}
                          onClick={() => saveTransation()}
                        >
                          Save
                        </Button>
                      </div>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

export default StudentFee;
