import React, { useEffect, useState } from "react";
import BasicTable from "../../components/atoms/Table";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import Drawer from "../../components/atoms/Drawer";
import { Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../../config/axiosConfig";
import { listCourseFee } from "../../services/listCourseFee";
import { listAdmissions } from "../../services/listAdmissions";
import DatePicker from "react-datepicker";

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
  const [totalFee, setTotalFee] = useState(11450000);
  const [admissionNo, setAdmissionNo] = useState("");
  const [admission, setAdmission] = useState([]);
  const [courseFeeList, setCourseFeeList] = useState([]);
  const [admissionDetail, setAdmissionDetail] = useState({
    totalFee: "",
  });
  const columns = [
    "Admission Number",
    "Student Name",
    "College Name",
    "Date",
    "Course",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listAdmissions();
        console.log("sssss", res);
        setAdmission(
          res?.map((item) => ({
            aNumber: item?.id,
            Name: item?.student?.first_name,
            CollegeName: item?.institute?.name,
            admissionDate: item?.admission_date,
            course: item?.course_id,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getCourseFeeList = async () => {
      try {
        const res = await listCourseFee();
        setCourseFeeList(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    getCourseFeeList();
  }, []);

  const TransactionHead = ["Transaction Id", "Description", "Amount", "Status"];

  const saveTransation = () => {
    setTransactionRow((prev) => [...prev, transactionDetail]);
  };

  const getDetail = (val) => {
    console.log("this is val", val);
    setOpen(true);
    console.log(
      "this is courseFees",
      courseFeeList?.data?.filter((res) => res?.course_id == val?.course)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      <BasicTable
        columns={columns}
        rows={admission}
        onClickFunction={getDetail}
      />
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
                      Fee Collected From Student:
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
                        <DatePicker
                          className="dob-datepicker"
                          // selected={dobDate}
                          // onChange={(date) => setDobDate(date)}
                          placeholderText="DD-MM-YYYY"
                        />
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
                      Fee to Paid to Collected:
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
