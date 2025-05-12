import {
  Button,
  InputAdornment,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import BasicTable from "../../../components/atoms/Table";
import { format } from "date-fns";
import ClearIcon from "@mui/icons-material/Clear";
import CustomCircularProgress from "../../../components/atoms/CircularProgress";
import Drawer from "../../../components/atoms/Drawer";
import { listCalls } from "../../../services/listCalls";
import { listLeads } from "../../../services/listLeads";
import Timer from "./timerComponent";
import { createCall } from "../../../services/createCall";
import { updateCall } from "../../../services/updateCall";
import CreateIcon from "@mui/icons-material/Create";

function Calls() {
  const columns = [
    "Lead Number",
    "Lead Name",
    "Call Start Time",
    "Call End Time",
    "Status",
    "Notes",
    "Branch",
    "Created Date",
  ];
  const [leadData, setLeadData] = useState({
    status: "",
    notes: "",
  });
  const [callsRow, setCallsRow] = useState([]);
  const [open, setOpen] = useState(false);
  const [createOrEdit, setCreateOrEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadsList, setLeadsList] = useState([]);
  const [leadsCompleteList, setLeadsCompleteList] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedLead, setSelectedLead] = useState({
    id: "",
    name: "",
  });
  const [selectedCall, setSelectedCall] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getLeadsList = () => {
    listCalls().then((res) => {
      setLeadsCompleteList(res);
      setCallsRow(
        res?.map((item) => {
          return {
            leadNumber: item?.lead_id,
            name: item?.lead?.name,
            startTime: format(item?.call_time_start, "dd-MM-yyyy hh:mm:ss"),
            endTime: format(item?.call_time_end, "dd-MM-yyyy hh:mm:ss"),
            status: item?.status,
            notes: item?.notes,
            branch: item?.lead?.branch_id,
            date: format(item?.created_at, "dd-MM-yyyy"),
          };
        })
      );
    });
  };

  useEffect(() => {
    getLeadsList();
    listLeads().then((res) => {
      setLeadsList(res);
    });
  }, []);

  const submitLead = () => {
    setLoading(true);
    let payload = {
      lead_id: selectedLead?.id,
      call_time_start: startTime,
      call_time_end: endTime,
      status: leadData?.status,
      notes: leadData?.notes,
      branch_id: "1",
    };
    console.log("the pay", payload);
    if (createOrEdit == "create") {
      createCall(payload).then((res) => {
        setLoading(false);
        setOpen(false);
        getLeadsList();
      });
    } else {
      updateCall(payload, selectedCall).then((res) => {
        setLoading(false);
        setOpen(false);
        getLeadsList();
      });
    }
  };

  const callDetail = (data, rowIndex) => {
    console.log(leadsCompleteList[rowIndex]);

    setCreateOrEdit("detail");
    setSelectedCall(leadsCompleteList[rowIndex]?.id);
    setOpen(true);
    setSelectedLead({
      id: leadsCompleteList[rowIndex]?.lead_id,
      name: leadsCompleteList[rowIndex]?.lead?.name,
    });
    setLeadData({
      notes: leadsCompleteList[rowIndex]?.notes,
      status: leadsCompleteList[rowIndex]?.status,
    });
    setStartTime(leadsCompleteList[rowIndex]?.call_time_start);
    setEndTime(leadsCompleteList[rowIndex]?.call_time_end);
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
                  {createOrEdit === "create" ? "Create Call" : "Update Call"}
                </h3>
                <div>
                  {createOrEdit === "detail" && (
                    <CreateIcon onClick={() => setCreateOrEdit("edit")} />
                  )}
                  <ClearIcon
                    onClick={() => setOpen(false)}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  />
                </div>
              </div>
              <div style={{ padding: "20px 20px 0px 20px" }}>
                <>
                  <h3 style={{ fontWeight: "600", fontSize: "16px" }}>
                    Call Details
                  </h3>
                  <div style={{ marginBottom: "10px" }}>
                    <Timer
                      setStartTime={setStartTime}
                      setEndTime={setEndTime}
                      isDisabled={selectedLead && createOrEdit == "detail"}
                      startTime={startTime}
                      endTime={endTime}
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      margin: "50px 0px 10px 0px",
                      justifyItems: "center",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label style={{ fontSize: "12px" }}>Select Lead</label>
                      <select
                        id="my-select"
                        style={{
                          borderRadius: "8px",
                          border: "1px solid lightgray",
                          padding: "10px",
                          fontSize: "14px",
                          height: "40px",
                          width: "100%",
                        }}
                        disabled={selectedLead && createOrEdit == "detail"}
                        value={selectedLead.id}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const selectedLead = leadsList?.find(
                            (lead) => lead.id == selectedId
                          );
                          setSelectedLead({
                            id: selectedLead?.id || "",
                            name: selectedLead?.name || "",
                          });
                        }}
                      >
                        <option value="">-</option>
                        {leadsList?.map((lead) => (
                          <option key={lead.id} value={lead.id}>
                            {lead.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label style={{ fontSize: "12px" }}>Select Status</label>
                      <select
                        id="my-select"
                        name="status"
                        style={{
                          height: "40px",
                          borderRadius: "8px",
                          borderColor: "lightgray",
                          fontSize: "14px",
                        }}
                        disabled={selectedLead && createOrEdit == "detail"}
                        value={leadData?.status}
                        onChange={handleChange}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
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
                      }}
                      disabled={selectedLead && createOrEdit == "detail"}
                      value={leadData?.notes}
                      onChange={handleChange}
                    />
                  </div>
                </>
              </div>
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
                  {loading ? <CustomCircularProgress /> : "Create"}
                </Button>
              </div>
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
          <h2 style={{ fontWeight: "600" }}> Calls</h2>
        </div>
      </div>
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
            }}
          >
            Create Call
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <BasicTable
          columns={columns}
          rows={callsRow}
          onClickFunction={callDetail}
        />
      </div>
    </div>
  );
}

export default Calls;
