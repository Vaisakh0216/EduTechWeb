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
  const TransactionHead = ["Transaction Id", "Description", "Amount", "Date"];
  const getAgentNames = (agentFees, agents) => {
    return agentFees.map((fee) => {
      const agent = agents.find((a) => a.id === fee?.agent_id);
      return agent ? agent.name : "Agent Not Found";
    });
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
        setAdmissionList(res);
        setAdmission(
          res?.map((item) => ({
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
    setagentDetails(admissionList?.filter((res) => res?.id == val?.aNumber)[0]);
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
                          <BasicTable columns={TransactionHead} rows={[]} />
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
                                // onChange={(e) => handleChange(e)}
                              />

                              <select
                                id="my-select"
                                name="description"
                                style={{
                                  height: "50px",
                                  borderRadius: "8px",
                                  width: "100%",
                                }}
                                // onChange={(e) => handleChange(e)}
                              >
                                <option value="">Select Payment Mode</option>
                                <option value="Cash">Cash</option>
                                <option value="Gpay">Gpay</option>
                                <option value="Check">Check</option>
                              </select>
                              <DatePicker
                                className="paymentDate"
                                // selected={dateOfPayment}
                                // onChange={(date) => setDateOfPayment(date)}
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
                                // onChange={(e) => handleChange(e)}
                              />
                              <Button
                                variant="contained"
                                style={{
                                  height: "50px",
                                  borderRadius: "8px",
                                  textTransform: "inherit",
                                }}
                                // onClick={() => saveTransation()}
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
