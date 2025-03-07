import { Button, TextField, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import BasicTable from "../../components/atoms/Table";
import Drawer from "../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

function Course() {
  const [open, setOpen] = useState(false);

  const columns = ["Course Name", "Course Code", "Course Duration", "Action"];
  const rows = [
    {
      sn: "1",
      cName: "Bachelor of Arts",
      cNumber: "BA",
      tCourses: "3",
      actions: <DeleteIcon />,
    },
    {
      sn: "2",
      cName: "Bachelor of Commerce",
      cNumber: "B.Com",
      tCourses: "3",
      actions: <DeleteIcon />,
    },
    {
      sn: "3",
      cName: "Bachelor of Business Administration",
      cNumber: "BBA",
      tCourses: "3",
      actions: <DeleteIcon />,
    },
    {
      sn: "4",
      cName: "Bachelor of Hotel Management",
      cNumber: "BHM",
      tCourses: "4",
      actions: <DeleteIcon />,
    },
    {
      sn: "5",
      cName: "Bachelor of Computer Application (BCA)",
      cNumber: "+91 989382389",
      tCourses: "3",
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
          <span style={{ fontSize: "16px" }}>Search by course name</span>
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
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>5000</span>
          <p style={{ padding: "0px", margin: "0px" }}>Total Courses</p>
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
            onClick={() => setOpen(true)}
          >
            Create Course
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
            <h3>All Courses</h3>
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
                <h3>Create Course</h3>
                <ClearIcon onClick={() => setOpen(false)} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                <h4>Course Details</h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Course Name"
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
                  />
                  <TextField
                    id="outlined-basic"
                    label="Course Short Code"
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
                  />
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
                  <select
                    id="my-select"
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "8px",
                    }}
                  >
                    <option value="">Select Duration</option>
                    <option value="option1">2</option>
                    <option value="option2">3</option>
                    <option value="option3"> 4</option>
                    <option value="option3"> 5</option>
                  </select>
                  <TextField
                    id="outlined-basic"
                    label="University Name"
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
                  />
                </div>
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

export default Course;
