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
import { getAdmissionTransaction } from "../../services/getFeeTransactionByAdmission";
import { format } from "date-fns";
import { createTransaction } from "../../services/createTransaction";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";

function StudentFee() {
  const TransactionHead = ["Transaction Id", "Description", "Amount", "Date"];
  const [open, setOpen] = useState(false);
  const [studentFee, setStudentFee] = useState(0);
  const [collegeFee, setCollegeFee] = useState(0);
  const [transactionRow, setTransactionRow] = useState([]);
  const [collegeTransactionRow, setCollegeTransactionRow] = useState([]);
  const [transactionDetail, setTransactionDetail] = useState({
    type: "",
    category: "",
    description: "",
    transaction_date: "",
    reference_id: "",
    amount: "",
    mode_of_payment: "",
    category_id: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [collegeTransactionDetail, setCollegeTransactionDetail] = useState({
    type: "",
    category: "",
    description: "",
    transaction_date: "",
    reference_id: "",
    amount: "",
    mode_of_payment: "",
    category_id: "",
  });
  const [totalFee, setTotalFee] = useState();
  const [admission, setAdmission] = useState([]);
  const [admissionDetail, setAdmissionDetail] = useState();
  const [selectedAdmissionDetail, setSelectedAdmissionDetail] = useState();
  const [feeCollected, setFeeCollected] = useState();
  const columns = [
    "Admission Number",
    "Student Name",
    "College Name",
    "Date",
    "Course",
  ];
  const [dateOfPayment, setDateOfPayment] = useState();
  const [selectedAdmissionNumber, setSelectedAdmissionNumber] = useState();

  console.log("this is selected", selectedAdmissionDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listAdmissions();
        setAdmissionDetail(res);
        setAdmission(
          res?.data?.map((item) => ({
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
  const saveTransation = () => {
    const payload = {
      type: "credit",
      category: "Admissions",
      description: transactionDetail?.description,
      transaction_date: format(dateOfPayment, "yyyy-MM-dd"),
      reference_id: selectedAdmissionNumber,
      amount: transactionDetail?.amount,
      mode_of_payment: transactionDetail?.mode_of_payment,
      category_id: 1,
      branch_id: selectedAdmissionDetail?.branch_id,
    };
    createTransaction(payload).then((res) => {
      getAdmissionTransaction(selectedAdmissionNumber, 1).then((res) => {
        setFeeCollected(res);
        setStudentFee(
          res?.reduce((sum, val) => {
            return val?.type == "credit" ? sum + Number(val?.amount) : sum;
          }, 0)
        );
        setTransactions(
          res
            ?.filter((item) => item?.type == "credit")
            .map((item) => ({
              ref: item?.description,
              description: item?.mode_of_payment,
              amount: item?.amount,
              paymentDate: item?.transaction_date,
            }))
        );
      });
    });
  };

  const saveCollegeTransation = () => {
    const payload = {
      type: "debit",
      category: "Paid to College",
      description: collegeTransactionDetail?.description,
      transaction_date: format(dateOfPayment, "yyyy-MM-dd"),
      reference_id: selectedAdmissionNumber,
      amount: collegeTransactionDetail?.amount,
      mode_of_payment: collegeTransactionDetail?.mode_of_payment,
      category_id: 6,
      branch_id: selectedAdmissionDetail?.branch_id,
    };
    createTransaction(payload).then((res) => {
      getAdmissionTransaction(selectedAdmissionNumber, 6).then((res) => {
        setFeeCollected(res);
        setCollegeFee(
          res?.reduce((sum, val) => {
            return val?.type == "debit" ? sum + Number(val?.amount) : sum;
          }, 0)
        );
        setCollegeTransactionRow(
          res
            ?.filter((item) => item?.type == "debit")
            .map((item) => ({
              ref: item?.description,
              description: item?.mode_of_payment,
              amount: item?.amount,
              paymentDate: item?.transaction_date,
            }))
        );
      });
    });
  };
  const calculateTotalFee = () => {
    return (
      // (Number(selectedAdmissionDetail?.course_fee?.admission_fee) || 0) +
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

  const calculateCollectedTotalFee = () => {
    return collegeTransactionRow?.reduce(
      (sum, val) => sum + Number(val?.amount),
      0
    );
  };

  const getDetail = (val) => {
    setOpen(true);
    setSelectedAdmissionDetail(
      admissionDetail?.data?.filter((res) => res?.id == val?.aNumber)[0]
    );
    setSelectedAdmissionNumber(val?.aNumber);
    getAdmissionTransaction(val?.aNumber, 1).then((res) => {
      setStudentFee(
        res?.reduce((sum, val) => {
          return val?.type == "credit" ? sum + Number(val?.amount) : sum;
        }, 0)
      );

      setTransactions(
        res
          ?.filter((item) => item?.type == "credit")
          .map((item) => ({
            ref: item?.description,
            description: item?.mode_of_payment,
            amount: item?.amount,
            paymentDate: item?.transaction_date,
          }))
      );
    });
    getAdmissionTransaction(val?.aNumber, 6).then((res) => {
      setCollegeFee(
        res?.reduce((sum, val) => {
          return val?.type == "debit" ? sum + Number(val?.amount) : sum;
        }, 0)
      );
      setCollegeTransactionRow(
        res
          ?.filter((item) => item?.type == "debit")
          .map((item) => ({
            ref: item?.description,
            description: item?.mode_of_payment,
            amount: item?.amount,
            paymentDate: item?.transaction_date,
          }))
      );
    });
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

  // useEffect(() => {
  //   if (transactionRow.length) {
  //     setStudentFee(
  //       parseFloat(transactionRow[transactionRow.length - 1]?.amount || 0) +
  //         parseFloat(studentFee || 0)
  //     );
  //   }
  // }, [transactionRow]);

  // useEffect(() => {
  //   if (collegeTransactionRow.length) {
  //     setCollegeFee(
  //       parseFloat(
  //         collegeTransactionRow[collegeTransactionRow.length - 1]?.amount || 0
  //       ) + parseFloat(collegeFee || 0)
  //     );
  //   }
  // }, [collegeTransactionRow]);

  console.log("admission details", selectedAdmissionDetail);

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
                        fontWeight: "600",
                        fontSize: "14px",
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
                        fontWeight: "600",
                        fontSize: "14px",
                        width: "30%",
                        backgroundColor: "lightgray",
                        padding: 5,
                      }}
                    >
                      Student Name:
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
                      {selectedAdmissionDetail?.student?.first_name.concat(
                        " ",
                        selectedAdmissionDetail?.student?.last_name
                      )}
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
                        padding: "5px 10px",
                        fontWeight: "600",
                        borderRadius: "20px",
                      }}
                    >
                      Amount Received
                    </h3>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        // padding: "4px",
                        padding: `${
                          studentFee ==
                            selectedAdmissionDetail?.course_fee
                              ?.service_charge ||
                          studentFee >
                            selectedAdmissionDetail?.course_fee?.service_charge
                            ? "5px 10px"
                            : "4px"
                        }`,
                        color: `${
                          studentFee ==
                            selectedAdmissionDetail?.course_fee
                              ?.service_charge ||
                          studentFee >
                            selectedAdmissionDetail?.course_fee?.service_charge
                            ? "white"
                            : "black"
                        }`,
                        backgroundColor: `${
                          studentFee ==
                            selectedAdmissionDetail?.course_fee
                              ?.service_charge ||
                          studentFee >
                            selectedAdmissionDetail?.course_fee?.service_charge
                            ? "lightgreen"
                            : ""
                        }`,
                        borderRadius: `${
                          studentFee ==
                            selectedAdmissionDetail?.course_fee
                              ?.service_charge ||
                          studentFee >
                            selectedAdmissionDetail?.course_fee?.service_charge
                            ? "5px"
                            : ""
                        }`,
                      }}
                    >
                      {studentFee ==
                        selectedAdmissionDetail?.course_fee?.service_charge ||
                      studentFee >
                        selectedAdmissionDetail?.course_fee?.service_charge
                        ? "Paid"
                        : studentFee +
                          ` / ${selectedAdmissionDetail?.course_fee?.service_charge}`}
                    </h3>
                    {studentFee >
                      selectedAdmissionDetail?.course_fee?.service_charge && (
                      <h3
                        style={{
                          fontSize: "12px",
                          fontWeight: "normal",
                          padding: "4px",
                          flexGrow: "1",
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        <GppMaybeIcon
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px",
                            color: "gray",
                          }}
                        />
                        Amount to be paid to college:{" "}
                        {studentFee -
                          selectedAdmissionDetail?.course_fee?.service_charge -
                          collegeFee}
                      </h3>
                    )}
                  </div>
                </div>
                <div style={{ border: "1px solid gray", padding: "5px" }}>
                  <Stack style={{}}>
                    <BasicTable
                      columns={TransactionHead}
                      rows={transactions}
                      onClickFunction={getDetail}
                    />
                    {studentFee !=
                      selectedAdmissionDetail?.course_fee?.service_charge && (
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          marginTop: "10px",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          name="description"
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
                          name="mode_of_payment"
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
                {/* {studentFee > 0 && ( */}
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
                        padding: "5px 10px",
                        fontWeight: "600",
                        borderRadius: "20px",
                      }}
                    >
                      Amount Paid
                    </h3>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        padding: `${
                          calculateTotalFee() -
                            selectedAdmissionDetail?.course_fee
                              ?.service_charge ==
                          calculateCollectedTotalFee()
                            ? "5px 10px"
                            : "4px"
                        }`,
                        color: `${
                          calculateTotalFee() -
                            selectedAdmissionDetail?.course_fee
                              ?.service_charge ==
                          calculateCollectedTotalFee()
                            ? "white"
                            : "black"
                        }`,
                        backgroundColor: `${
                          calculateTotalFee() -
                            selectedAdmissionDetail?.course_fee
                              ?.service_charge ==
                          calculateCollectedTotalFee()
                            ? "lightgreen"
                            : ""
                        }`,
                        borderRadius: `${
                          calculateTotalFee() -
                            selectedAdmissionDetail?.course_fee
                              ?.service_charge ==
                          calculateCollectedTotalFee()
                            ? "5px"
                            : ""
                        }`,
                      }}
                    >
                      {calculateTotalFee() -
                        selectedAdmissionDetail?.course_fee?.service_charge ==
                      calculateCollectedTotalFee()
                        ? "Paid"
                        : calculateCollectedTotalFee() +
                          ` / ${
                            calculateTotalFee() -
                            selectedAdmissionDetail?.course_fee?.service_charge
                          }`}
                    </h3>
                  </div>
                  <div style={{ border: "1px solid gray", padding: "5px" }}>
                    <Stack style={{}}>
                      <BasicTable
                        columns={TransactionHead}
                        rows={collegeTransactionRow}
                        onClickFunction={getDetail}
                      />
                      {collegeFee !=
                        calculateTotalFee() -
                          selectedAdmissionDetail?.course_fee
                            ?.service_charge && (
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            marginTop: "10px",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            name="description"
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
                          <select
                            id="my-select"
                            name="mode_of_payment"
                            style={{
                              height: "50px",
                              borderRadius: "8px",
                              width: "100%",
                            }}
                            onChange={(e) => handleCollegeChange(e)}
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
                      )}
                    </Stack>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

export default StudentFee;
