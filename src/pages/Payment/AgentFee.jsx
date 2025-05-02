import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicTable from "../../components/atoms/Table";
import { listAdmissions } from "../../services/listAdmissions";
import { listAgents } from "../../services/listAgents";
import Drawer from "../../components/atoms/Drawer";
import { Button, Stack, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { createTransaction } from "../../services/createTransaction";
import { getAdmissionTransaction } from "../../services/getFeeTransactionByAdmission";

function AgentFee() {
  const [open, setOpen] = useState(false);
  const [admissionList, setAdmissionList] = useState();
  const [agentList, setAgentList] = useState([]);
  const [admission, setAdmission] = useState([]);
  const [agentDetails, setagentDetails] = useState();
  const columns = [
    "Admission Number",
    "Student Name",
    "College Name",
    "Date",
    "Course",
  ];
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
  const TransactionHead = [
    "Transaction Id",
    "Mode Of Payment",
    "Amount",
    "Date",
  ];
  const [dateOfPayment, setDateOfPayment] = useState();
  const [transactionRow, setTransactionRow] = useState([]);
  const [selectedAdmissionNumber, setSelectedAdmissionNumber] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await listAgents();
        setAgentList(res?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        const res = await listAdmissions();
        console.log("this is res", res);
        setAdmissionList(res?.data);
        setAdmission(
          res?.data?.map((item) => ({
            aNumber: item?.id,
            Name: item?.student?.first_name.concat(
              " ",
              item?.student?.last_name
            ),
            collegeName: item?.institute?.name,
            course: item?.course?.name,
            admissionDate: item?.admission_date,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAdmission();
  }, [agentList?.length]);

  const getDetails = (val) => {
    setOpen(true);
    setSelectedAdmissionNumber(val?.aNumber);
    setagentDetails(admissionList?.filter((res) => res?.id == val?.aNumber)[0]);
    console.log(
      "ddddd",
      admissionList
        ?.filter((res) => res?.id == val?.aNumber)[0]
        ?.agent_fees?.map((res) =>
          // getAdmissionTransaction(res?.agent_id).then((res) => {
          //   setTransactionRow((prev) => [
          //     ...prev,
          //     res?.data
          //       ?.filter((item) => item?.type == "debit")
          //       .map((item) => ({
          //         agent: res?.agent_id,
          //         ref: item?.id,
          //         mode_of_payment: item?.mode_of_payment,
          //         amount: item?.amount,
          //         paymentDate: item?.transaction_date,
          //       })),
          //   ]);
          // })

          getAdmissionTransaction(res?.agent_id).then((res) => {
            const debitTransactions = res?.data
              ?.filter((item) => item?.type === "debit")
              .map((item) => ({
                ref: item?.id,
                mode_of_payment: item?.mode_of_payment,
                amount: item?.amount,
                paymentDate: item?.transaction_date,
              }));

            setTransactionRow((prev) => [...prev, ...debitTransactions]);
          })
        )
    );
  };

  const saveTransation = () => {
    const payload = {
      type: "debit",
      category: "Admissions",
      description: "Agent fee",
      transaction_date: format(dateOfPayment, "yyyy-MM-dd"),
      reference_id: agentDetails?.agent_id,
      amount: transactionDetail?.amount,
      mode_of_payment: transactionDetail?.mode_of_payment,
      category_id: 1,
    };
    createTransaction(payload).then((res) => {
      getAdmissionTransaction(selectedAdmissionNumber).then((res) => {
        setTransactionRow(
          res?.data
            ?.filter((item) => item?.type == "debit")
            .map((item) => ({
              ref: item?.description,
              mode_of_payment: item?.mode_of_payment,
              amount: item?.amount,
              paymentDate: item?.transaction_date,
            }))
        );
      });
    });
  };

  console.log("this is agent detail", agentDetails);

  return (
    <div>
      <BasicTable
        columns={columns}
        rows={admission}
        onClickFunction={getDetails}
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
                <h3>Agent Fee Tracking</h3>
                <ClearIcon onClick={() => setOpen(false)} />
              </div>
              <div style={{ padding: "15px" }}>
                <div style={{ marginTop: "50px" }}>
                  {agentDetails?.agent_fees?.map((agent) => (
                    <>
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
                          {
                            agentList?.filter(
                              (res) => res?.id == agent?.agent_id
                            )[0]?.name
                          }
                        </h3>
                        <h3
                          style={{
                            fontSize: "14px",
                            fontWeight: "normal",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {agent?.amount}
                        </h3>
                      </div>
                      <div style={{ border: "1px solid gray", padding: "5px" }}>
                        <Stack style={{}}>
                          <BasicTable
                            columns={TransactionHead}
                            rows={transactionRow}
                          />
                          {agent?.amount > 0 && (
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
                    </>
                  ))}
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

export default AgentFee;
