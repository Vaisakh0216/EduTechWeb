import {
  Button,
  InputAdornment,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { createLead } from "../../../services/createLead";
import BasicTable from "../../../components/atoms/Table";
import { listLeads } from "../../../services/listLeads";
import { format } from "date-fns";
import ClearIcon from "@mui/icons-material/Clear";
import CustomCircularProgress from "../../../components/atoms/CircularProgress";
import Drawer from "../../../components/atoms/Drawer";
import AreaChart from "../../Dashboard/AdmissionBars";
import CreateIcon from "@mui/icons-material/Create";
import { updateLead } from "../../../services/updateLead";

function Leads() {
  const columns = [
    "Name",
    "Email",
    "Phone",
    "Source",
    "Status",
    "Notes",
    "Branch",
    "Created Date",
  ];
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    notes: "",
  });
  const [leadsRow, setLeadsRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [createOrEdit, setCreateOrEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [completeLeadList, setCompleteLeadList] = useState([]);
  const [selectedLead, setSelectedLead] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getLeadsList = () => {
    listLeads().then((res) => {
      setCompleteLeadList(res);
      setLeadsRow(
        res?.map((item) => {
          return {
            name: item?.name,
            email: item?.email,
            phone: item?.phone,
            source: item?.source,
            status: item?.status,
            notes: item?.notes,
            branch: item?.branch_id,
            date: format(item?.created_at, "dd-MM-yyyy"),
          };
        })
      );
    });
  };

  useEffect(() => {
    getLeadsList();
  }, []);

  const submitLead = () => {
    setLoading(true);
    let payload = {
      name: leadData?.name,
      email: leadData?.email,
      source: leadData?.source,
      phone: leadData?.phone,
      notes: leadData?.notes,
      branch_id: "1",
    };
    if (createOrEdit == "create") {
      createLead(payload).then((res) => {
        setLoading(false);
        setOpen(false);
        getLeadsList();
      });
    } else {
      updateLead(payload, selectedLead?.id).then((res) => {
        setLoading(false);
        setOpen(false);
        getLeadsList();
      });
    }
  };

  const getLeadDetail = (data, rowIndex) => {
    console.log(completeLeadList[rowIndex]);
    setOpen(true);
    setCreateOrEdit("detail");
    setSelectedLead(completeLeadList[rowIndex]);
    setLeadData({
      email: completeLeadList[rowIndex]?.email,
      name: completeLeadList[rowIndex]?.name,
      notes: completeLeadList[rowIndex]?.notes,
      phone: completeLeadList[rowIndex]?.phone,
      source: completeLeadList[rowIndex]?.source,
    });
  };

  return (
    <div>
      {open && (
        <Drawer
          open={open}
          setOpen={setOpen}
          content={
            <div style={{ color: "black" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  borderBottom: "1px solid black",
                }}
              >
                <h3 style={{ fontWeight: "700", fontSize: "18px" }}>
                  {createOrEdit === "create" ? "Create Lead" : "Update Lead"}
                </h3>
                <div>
                  {createOrEdit === "detail" && (
                    <CreateIcon onClick={() => setCreateOrEdit("edit")} />
                  )}
                  <ClearIcon
                    onClick={() => setOpen(false)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div style={{ padding: "20px 20px 0px 20px" }}>
                <>
                  <h3 style={{ fontWeight: "600", fontSize: "16px" }}>
                    Lead Details
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="name"
                      name="name"
                      variant="outlined"
                      style={{ width: "100%" }}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "50px",
                          borderRadius: "8px",
                          fontFamily: "poppins",
                          fontSize: "14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-2px",
                          fontSize: "14px",
                        },
                      }}
                      disabled={leadData && createOrEdit == "detail"}
                      value={leadData?.name}
                      onChange={handleChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      name="email"
                      variant="outlined"
                      style={{ width: "100%" }}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "50px",
                          borderRadius: "8px",
                          fontFamily: "poppins",
                          fontSize: "14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-2px",
                          fontSize: "14px",
                        },
                      }}
                      disabled={leadData && createOrEdit == "detail"}
                      value={leadData?.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Phone"
                      name="phone"
                      variant="outlined"
                      style={{ width: "100%" }}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "50px",
                          borderRadius: "8px",
                          fontFamily: "poppins",
                          fontSize: "14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-2px",
                          fontSize: "14px",
                        },
                      }}
                      disabled={leadData && createOrEdit == "detail"}
                      value={leadData?.phone}
                      onChange={handleChange}
                    />

                    <TextField
                      id="outlined-basic"
                      label="Source"
                      name="source"
                      variant="outlined"
                      style={{ width: "100%" }}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: "50px",
                          borderRadius: "8px",
                          fontFamily: "poppins",
                          fontSize: "14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-2px",
                          fontSize: "14px",
                        },
                      }}
                      disabled={leadData && createOrEdit == "detail"}
                      value={leadData?.source}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <TextareaAutosize
                      name="notes"
                      placeholder="Notes"
                      style={{
                        height: "100px",
                        width: "100%",
                        borderRadius: "8px",
                        fontFamily: "poppins",
                        fontSize: "14px",
                        padding: "10px",
                        border: "1px solid lightgray",
                        maxHeight: "300px",
                        backgroundColor: "white",
                        color:
                          leadData && createOrEdit == "detail" ? "#9E9E9E" : "",
                      }}
                      disabled={leadData && createOrEdit == "detail"}
                      value={leadData?.notes}
                      onChange={handleChange}
                    />
                  </div>
                </>
              </div>
              {(createOrEdit == "create" || createOrEdit == "edit") && (
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
                    onClick={() => submitLead()}
                  >
                    {loading ? (
                      <CustomCircularProgress />
                    ) : createOrEdit == "edit" ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              )}
            </div>
          }
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ fontWeight: "600" }}> Leads</h2>
        </div>
      </div>
      {/* <div style={{ marginBottom: "20px" }}>
        <AreaChart
          title="Leads Range"
          subtitle="Leads of each days"
          width={1200}
          height={300}
        />
      </div> */}
      <div
        style={{
          margin: "auto",
          float: "right",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            gap: "10px",
          }}
        >
          <TextField
            placeholder="Search..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                fontSize: "14px",
              },
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            style={{
              height: "40px",
              borderRadius: "8px",
              fontSize: "14px",
              textTransform: "capitalize",
              backgroundColor: "white",
              color: "black",
            }}
          >
            Filter
          </Button>
          <Button
            style={{
              textTransform: "inherit",
              backgroundColor: "#775da6",
              height: "40px",
              borderRadius: "5px",
              color: "white",
            }}
            onClick={() => {
              setOpen(true);
              setCreateOrEdit("create");
              setLeadData({});
            }}
          >
            Create Lead
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "80px" }}>
        <BasicTable
          columns={columns}
          rows={leadsRow}
          onClickFunction={getLeadDetail}
        />
      </div>
    </div>
  );
}

export default Leads;
