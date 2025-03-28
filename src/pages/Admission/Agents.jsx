import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/atoms/Table";
import Drawer from "../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createCourse } from "../../services/createCourse";
import CustomCircularProgress from "../../components/atoms/CircularProgress";
import { listUniversities } from "../../services/listUniversities";
import { listAgents } from "../../services/listAgents";
import { createAgent } from "../../services/createAgent";
import CreateIcon from "@mui/icons-material/Create";

function Agents() {
  const [open, setOpen] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentType, setAgentType] = useState("");
  const [phone, setPhone] = useState("");
  const [fee, setfee] = useState("");
  const [errors, setErrors] = useState({
    agentName: "",
    agentType: "",
    phone: "",
    fee: "",
  });
  const [loading, setLoading] = useState(false);
  const [agentList, setAgentList] = useState([]);
  const [createOrEdit, setCreateOrEdit] = useState("");
  const [selectedAgent, setSelectedAgent] = useState();
  const columns = ["Agent Name", "Agent Type", "Contact Number", "Agent Fee"];

  const validateForm = () => {
    let isValid = true;
    let tempErrors = {
      agentName: "",
      agentType: "",
      phone: "",
      fee: "",
    };

    if (!agentName) {
      tempErrors.agentName = "Agent Name is required.";
      isValid = false;
    }

    // Validate Course Code
    if (!agentType) {
      tempErrors.agentType = "Agent type is required.";
      isValid = false;
    }

    // Validate Course Duration
    if (!phone) {
      tempErrors.phone = "Phone Number is required.";
      isValid = false;
    }

    // Validate University
    // if (!fee) {
    //   tempErrors.fee = "Fee is required.";
    //   isValid = false;
    // }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    const payload = {
      name: agentName,
      agent_type: agentType,
      contact_number: phone,
    };
    if (validateForm()) {
      setLoading(true);
      createAgent(payload).then((res) => {
        setLoading(false);
        setOpen(false);
        getAgentlist();
      });
    }
  };

  const getAgentlist = () => {
    listAgents().then((res) => {
      setAgentList(
        res?.data?.map((item) => {
          return {
            name: item?.name,
            agent_type: item?.agent_type,
            contact_number: item?.contact_number,
            agent_fee: "0",
          };
        })
      );
    });
  };

  useEffect(() => {
    getAgentlist();
  }, []);

  const getAgentDetail = (res) => {
    console.log("theres", res);
    setOpen(true);
    setSelectedAgent(res);
    setCreateOrEdit("detail");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <span style={{ fontSize: "16px" }}>Search by agent name</span>
          <TextField id="outlined-basic" label="Name" variant="outlined" />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>1000</span>
          <p style={{ padding: "0px", margin: "0px" }}>Total Agents</p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              fontSize: "16px",
              textTransform: "inherit",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(true);
              setCreateOrEdit("create");
              setSelectedAgent("");
            }}
          >
            Create Agent
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <div>
            <h3>All Agents</h3>
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
            rows={agentList}
            onClickFunction={getAgentDetail}
          />
        </div>
      </div>
      {open && (
        <Drawer
          open={open}
          setOpen={setOpen}
          content={
            <div style={{ color: "black", overflowY: "scroll" }}>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  borderBottom: "1px solid black",
                }}
              >
                <h3>
                  {createOrEdit === "create" ? "Create Agent" : "Update Agent"}
                </h3>
                <ClearIcon
                  onClick={() => setOpen(false)}
                  style={{ cursor: "pointer" }}
                />
              </div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  borderBottom: "1px solid black",
                }}
              >
                <h3>
                  {createOrEdit === "create" ? "Create Agent" : "Update Agent"}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {createOrEdit === "detail" && (
                    <CreateIcon onClick={() => setCreateOrEdit("edit")} />
                  )}
                  <ClearIcon onClick={() => setOpen(false)} />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                <div
                  style={{
                    border: "2px dotted #E8E8E8",
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%", // Make the outer div a circle
                    marginTop: "20px",
                    display: "flex", // Enable flexbox on parent div
                    justifyContent: "center", // Center the child div horizontally
                    alignItems: "center", // Center the child div vertically
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "50%",
                      backgroundColor: "#F2F2F2",
                      position: "relative",
                    }}
                  />
                  <div style={{ position: "absolute" }}>
                    <AddPhotoAlternateIcon fontSize="large" color="disabled" />
                  </div>
                </div>
              </div>
              <div style={{ padding: "20px 20px 0px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <FormControl
                    error={Boolean(errors.agentName)}
                    style={{ width: "100%" }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Agent Name"
                      variant="outlined"
                      style={{ width: "100%" }}
                      disabled={selectedAgent}
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
                      value={selectedAgent ? selectedAgent?.name : agentName}
                      onChange={(e) => {
                        setAgentName(e.target.value);
                      }}
                    />
                    {errors.agentName && (
                      <FormHelperText>{errors.agentName}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth error={Boolean(errors.agentType)}>
                    <select
                      id="my-select"
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "8px",
                        border: "1px solid lightgray",
                        padding: "10px",
                        fontSize: "14px",
                      }}
                      disabled={selectedAgent?.agent_type}
                      value={
                        selectedAgent ? selectedAgent?.agent_type : agentType
                      }
                      onChange={(e) => setAgentType(e.target.value)}
                    >
                      <option value="">Select Agent Type</option>
                      <option value="Main">Main</option>
                      <option value="Sub">Sub</option>
                      <option value="College">College</option>
                    </select>
                    {errors.agentType && (
                      <FormHelperText>{errors.agentType}</FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <FormControl
                    error={Boolean(errors.phone)}
                    style={{ width: "100%" }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Phone Number"
                      variant="outlined"
                      style={{ width: "100%" }}
                      disabled={selectedAgent?.contact_number}
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
                      value={
                        selectedAgent ? selectedAgent?.contact_number : phone
                      }
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                    {errors.phone && (
                      <FormHelperText>{errors.phone}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    error={Boolean(errors.fee)}
                    style={{ width: "100%" }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Agent Fee"
                      variant="outlined"
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
                      disabled={selectedAgent?.agent_fee}
                      value={selectedAgent ? selectedAgent?.agent_fee : fee}
                      onChange={(e) => {
                        setfee(e.target.value);
                      }}
                    />
                    {errors.fee && (
                      <FormHelperText>{errors.fee}</FormHelperText>
                    )}
                  </FormControl>
                </div>
              </div>
              {createOrEdit === "create" && (
                <div
                  style={{
                    padding: "50px 20px",
                    display: "flex",
                    justifyContent: "end",
                    bottom: 0,
                    position: "fixed",
                    right: 0,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => setOpen(false)}
                    style={{ textTransform: "inherit", padding: "8px 20px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      marginLeft: "10px",
                      textTransform: "inherit",
                      padding: "8px 20px",
                    }}
                    onClick={() => handleSubmit()}
                  >
                    {loading ? <CustomCircularProgress /> : "Create"}
                  </Button>
                </div>
              )}
            </div>
          }
        />
      )}
    </div>
  );
}

export default Agents;
