import React, { useEffect, useState } from "react";
import { getAgentDetail } from "../../../services/getAgentDetail";
import { useParams } from "react-router-dom";
import {
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import BasicTable from "../../../components/atoms/Table";
import Drawer from "../../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import { getAdmissionTransaction } from "../../../services/getFeeTransactionByAdmission";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { listAdmissions } from "../../../services/listAdmissions";
import { createTransaction } from "../../../services/createTransaction";
import { ToastContainer, toast } from "react-toastify";

function AgentDetail() {
  const params = useParams();
  const [selectedAgentDetail, setSelectedAgentDetail] = useState();
  const [selectedAgentCompleteDetail, setSelectedAgentCompleteDetail] =
    useState();
  const [selectedAmount, setSelectedAmount] = useState();
  const [open, setOpen] = useState(false);
  const [totalTransactionMaid, setTotalTransactionsMaid] = useState();
  const [transactionRow, setTransactionsRow] = useState();
  const [transactionList, setTransactionsList] = useState();
  const [admissionsList, setAdmissionsList] = useState();
  const [selectedBranch, setSelectedBranch] = useState();
  const [agentTransactionDetails, setAgentTransactionDetail] = useState({
    type: "debit",
    category: "Paid to Agent",
    description: "",
    transaction_date: "",
    reference_id: "",
    amount: "",
    mode_of_payment: "",
    category_id: "7",
  });
  const [dateOfPayment, setDateOfPayment] = useState();
  const [errors, setErrors] = useState({
    transactionEr: "",
    modeEr: "",
    dateEr: "",
    amountEr: "",
  });

  const columns = [
    "Admission Number",
    "Amount",
    "Status",
    "Created Date",
    "Updated Date",
  ];

  const transactionColumns = [
    "Transaction Id",
    "Reference Id",
    "Mode of Payment",
    "Amount",
    "Date",
  ];

  useEffect(() => {
    getAgentDetail(params?.id).then((res) => {
      setSelectedAgentCompleteDetail(res);
      setSelectedAgentDetail(
        res?.agent_fees?.map((item) => {
          return {
            admissionNumber: item?.admission_id,
            amount: item?.amount,
            status: item?.status,
            createdDate: format(item?.created_at, "yyyy-MM-dd"),
            updatedDate: format(item?.updated_at, "yyyy-MM-dd"),
          };
        })
      );
    });
    listAdmissions().then((res) => {
      setAdmissionsList(res?.data);
    });
  }, [params?.id]);

  const getAgent = (res) => {
    setOpen(true);
    setSelectedAmount(
      selectedAgentDetail?.reduce((sum, val) => {
        return sum + Number(val?.amount);
      }, 0)
    );
    getAdmissionTransaction(params?.id, 7).then((res) => {
      setTransactionsRow(
        res?.map((item) => {
          return {
            transactionId: item?.id,
            referenceId: item?.description,
            mode: item?.mode_of_payment,
            amount: item?.amount,
            date: format(item?.created_at, "yyyy-MM-dd"),
          };
        })
      );
      setTransactionsList(res);
      setTotalTransactionsMaid(
        res?.reduce((sum, val) => {
          return sum + Number(val?.amount);
        }, 0)
      );
    });
    setSelectedBranch(
      admissionsList?.filter(
        (admission) => res?.admissionNumber == admission?.id
      )[0]?.branch_id
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentTransactionDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let tempErrors = {
      transactionEr: "",
      modeEr: "",
      dateEr: "",
      amountEr: "",
    };

    if (!agentTransactionDetails?.description) {
      tempErrors.transactionEr = "Ref is required.";
      isValid = false;
    }
    if (!agentTransactionDetails?.mode_of_payment) {
      tempErrors.modeEr = "Mode is required.";
      isValid = false;
    }
    if (!dateOfPayment) {
      tempErrors.dateEr = "Date is required.";
      isValid = false;
    }
    if (!agentTransactionDetails?.amount) {
      tempErrors.amountEr = "Amount is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const saveTransation = () => {
    if (validateForm()) {
      if (agentTransactionDetails?.amount > Math.abs(selectedAmount)) {
        toast("Amount entered is greater than the total service charge", {
          hideProgressBar: true,
          type: "error",
          theme: "colored",
        });
      } else {
        const payload = {
          type: "debit",
          category: "Paid to Agent",
          description: agentTransactionDetails?.description,
          transaction_date: format(dateOfPayment, "yyyy-MM-dd"),
          reference_id: params?.id,
          amount: agentTransactionDetails?.amount,
          mode_of_payment: agentTransactionDetails?.mode_of_payment,
          category_id: agentTransactionDetails?.category_id,
          branch_id: selectedBranch,
        };
        createTransaction(payload).then((res) => {
          getAdmissionTransaction(params?.id, 7).then((res) => {
            setTransactionsRow(
              res?.map((item) => {
                return {
                  transactionId: item?.id,
                  referenceId: item?.description,
                  mode: item?.mode_of_payment,
                  amount: item?.amount,
                  date: format(item?.created_at, "yyyy-MM-dd"),
                };
              })
            );
            setTransactionsList(res);
            setTotalTransactionsMaid(
              res?.reduce((sum, val) => {
                return sum + Number(val?.amount);
              }, 0)
            );
          });
        });
      }
    }
  };

  console.log("the agent detail", selectedAgentDetail);

  return (
    <div>
      <ToastContainer />
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
                <h3>Agent Fee Tracking</h3>
                <ClearIcon onClick={() => setOpen(false)} />
              </div>
              <div style={{ padding: "15px" }}>
                <div style={{ marginTop: "50px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      gap: "5px",
                      marginTop: "20px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "14px",
                        backgroundColor: "lightgray",
                        padding: "4px",
                      }}
                    >
                      {selectedAgentCompleteDetail?.name}
                    </h3>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        padding: `${
                          totalTransactionMaid === Math.abs(selectedAmount)
                            ? "5px 10px"
                            : "4px"
                        }`,
                        color: `${
                          totalTransactionMaid === Math.abs(selectedAmount)
                            ? "white"
                            : "black"
                        }`,
                        backgroundColor: `${
                          totalTransactionMaid === Math.abs(selectedAmount)
                            ? "lightgreen"
                            : ""
                        }`,
                        borderRadius: `${
                          totalTransactionMaid === Math.abs(selectedAmount)
                            ? "5px"
                            : ""
                        }`,
                      }}
                    >
                      {totalTransactionMaid === Math.abs(selectedAmount)
                        ? "Paid"
                        : totalTransactionMaid + ` / ${selectedAmount}`}
                    </h3>
                  </div>
                </div>
              </div>
              <div style={{ padding: "15px" }}>
                <Stack style={{}}>
                  <BasicTable
                    columns={transactionColumns}
                    rows={transactionRow}
                  />
                </Stack>
                {totalTransactionMaid != selectedAmount && (
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      marginTop: "10px",
                    }}
                  >
                    <FormControl
                      error={Boolean(errors.transactionEr)}
                      style={{ width: "100%" }}
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
                      {errors.transactionEr && (
                        <FormHelperText>{errors.transactionEr}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(errors.modeEr)}>
                      <select
                        id="my-select"
                        name="mode_of_payment"
                        style={{
                          height: "50px",
                          borderRadius: "8px",
                          width: "100%",
                          border: "1px solid lightgray",
                        }}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="">Select Payment Mode</option>
                        <option value="Cash">Cash</option>
                        <option value="Gpay">Gpay</option>
                        <option value="Check">Check</option>
                      </select>
                      {errors.modeEr && (
                        <FormHelperText>{errors.modeEr}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(errors.dateEr)}>
                      <DatePicker
                        className="paymentDate"
                        selected={dateOfPayment}
                        onChange={(date) => setDateOfPayment(date)}
                        placeholderText="dd-mm-yyyy"
                      />
                      {errors.dateEr && (
                        <FormHelperText>{errors.dateEr}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl fullWidth error={Boolean(errors.amountEr)}>
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
                      {errors.amountEr && (
                        <FormHelperText>{errors.amountEr}</FormHelperText>
                      )}
                    </FormControl>
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
              </div>
            </div>
          }
        />
      )}
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <div>
            <h3>Agent Admissions List</h3>
          </div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <span>Show</span>
            <span
              style={{
                padding: "10px",
                backgroundColor: "white",
                border: "1px solid lightblue",
                borderRadius: "5px",
              }}
            >
              5
            </span>{" "}
            <span>Per page</span>
          </div>
        </div>
        <div>
          <BasicTable
            columns={columns}
            rows={selectedAgentDetail}
            onClickFunction={getAgent}
          />
        </div>
      </div>
    </div>
  );
}

export default AgentDetail;
