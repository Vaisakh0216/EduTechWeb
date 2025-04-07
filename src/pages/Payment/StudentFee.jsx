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
  const [collegeTransactionRow, setCollegeTransactionRow] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState({
    ref: "",
    description: "",
    amount: "",
    paymentDate: "",
  });
  const [collegeTransactionDetail, setCollegeTransactionDetail] = useState({
    ref: "",
    description: "",
    amount: "",
    paymentDate: "",
  });
  const [totalFee, setTotalFee] = useState(11450000);
  const [admission, setAdmission] = useState([]);
  const [admissionDetail, setAdmissionDetail] = useState();
  const [selectedAdmissionDetail, setSelectedAdmissionDetail] = useState();
  const columns = [
    "Admission Number",
    "Student Name",
    "College Name",
    "Date",
    "Course",
  ];
  const [dateOfPayment, setDateOfPayment] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listAdmissions();
        setAdmissionDetail(res);
        setAdmission(
          res?.map((item) => ({
            aNumber: item?.id,
            Name: item?.student?.first_name.concat(
              " ",
              item?.student?.last_name
            ),
            CollegeName: item?.institute?.name,
            course: item?.course?.name,
            admissionDate: item?.admission_date,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const TransactionHead = ["Transaction Id", "Description", "Amount", "Date"];

  const saveTransation = () => {
    setTransactionRow((prev) => [...prev, transactionDetail]);
  };

  const saveCollegeTransation = () => {
    setCollegeTransactionRow((prev) => [...prev, collegeTransactionDetail]);
  };

  const calculateTotalFee = () => {
    return (
      (Number(selectedAdmissionDetail?.course_fee?.admission_fee) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.hostel_term_1) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.hostel_term_2) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.hostel_term_3) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.hostel_term_4) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.hostel_term_5) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.hostel_term_6) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.service_charge) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.tuition_term_1) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.tuition_term_2) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.tuition_term_3) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.tuition_term_4) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.tuition_term_5) || 0) +
      (Number(selectedAdmissionDetail?.course_fee?.tuition_term_6) || 0)
    );
  };

  const getDetail = (val) => {
    setOpen(true);
    setSelectedAdmissionDetail(
      admissionDetail?.filter((res) => res?.id == val?.aNumber)[0]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCollegeChange = (e) => {
    const { name, value } = e.target;
    setCollegeTransactionDetail((prev) => ({
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
                      {selectedAdmissionDetail?.id}
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
                      {calculateTotalFee()}
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
                          calculateTotalFee() == studentFee ? "5px 10px" : "4px"
                        }`,
                        color: `${
                          calculateTotalFee() === studentFee ? "white" : "black"
                        }`,
                        backgroundColor: `${
                          calculateTotalFee() == studentFee ? "lightgreen" : ""
                        }`,
                        borderRadius: `${
                          calculateTotalFee() == studentFee ? "5px" : ""
                        }`,
                      }}
                    >
                      {calculateTotalFee() == studentFee ? "Paid" : studentFee}
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

                        <select
                          id="my-select"
                          name="description"
                          style={{
                            height: "50px",
                            borderRadius: "8px",
                            width: "100%",
                          }}
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="">Select Payment Mode</option>
                          <option value="Cash">Cash</option>
                          <option value="Gpay">Gpay</option>
                          <option value="Check">Check</option>
                        </select>
                        <DatePicker
                          className="paymentDate"
                          selected={dateOfPayment}
                          onChange={(date) => setDateOfPayment(date)}
                          placeholderText="DD-MM-YYYY"
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
                {studentFee > 0 && (
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
                        Fee Paid to College:
                      </h3>
                      <h3
                        style={{
                          fontSize: "14px",
                          fontWeight: "normal",
                          padding: "4px",
                        }}
                      >
                        {totalFee === studentFee
                          ? "Paid Completely"
                          : studentFee}
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
                          rows={collegeTransactionRow}
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
                            onChange={(e) => handleCollegeChange(e)}
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
                            onChange={(e) => handleCollegeChange(e)}
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
                            onChange={(e) => handleCollegeChange(e)}
                          />
                          <Button
                            variant="contained"
                            style={{
                              height: "50px",
                              borderRadius: "8px",
                              textTransform: "inherit",
                            }}
                            onClick={() => saveCollegeTransation()}
                          >
                            Save
                          </Button>
                        </div>
                      </Stack>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

export default StudentFee;
