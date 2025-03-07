import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import BasicTable from "../../components/atoms/Table";
import Drawer from "../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

function Onboard() {
  const [open, setOpen] = useState(false);

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
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Otor John",
      CollegeName: "Garden City College",
      admissionDate: "16/11/2022",
      course: "BCA",
      actions: <DeleteIcon />,
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)",
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
          <span style={{ fontSize: "14px" }}>Search by admission number</span>
          <TextField
            id="outlined-basic"
            label="Number"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                height: "45px",
                borderRadius: "8px",
              },
              "& .MuiInputLabel-root": {
                top: "-5px",
                fontSize: "14px",
              },
            }}
          />
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
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>100000</span>
          <p style={{ padding: "0px", margin: "0px", fontSize: "14px" }}>
            Total Admissions
          </p>
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
              background: "linear-gradient(to right, #14ADD6, #384295)",
              fontSize: "16px",
              textTransform: "inherit",
              cursor: "pointer",
              padding: "10px 30px",
              borderRadius: "15px",
            }}
            onClick={() => setOpen(true)}
          >
            Create Admission
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
            <h3>All Admissions</h3>
          </div>
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <span>Show</span>
            <span
              style={{
                padding: "10px 18px",
                backgroundColor: "white",
                border: "1px solid lightblue",
                borderRadius: "5px",
              }}
            >
              5
            </span>
            <span>Per page</span>
          </div>
        </div>
        <BasicTable columns={columns} rows={rows} />
      </div>
      {open && (
        <Drawer
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
                  borderBottom: "1px solid black",
                }}
              >
                <h3>Create Admission</h3>
                <ClearIcon onClick={() => setOpen(false)} />
              </div>
              <div style={{ margin: "0px 15px" }}>
                <h6>Basic information</h6>
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
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="contained" style={{ marginLeft: "10px" }}>
                  Create
                </Button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

export default Onboard;
