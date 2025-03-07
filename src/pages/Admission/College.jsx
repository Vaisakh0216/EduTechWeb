import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import BasicTable from "../../components/atoms/Table";
import Drawer from "../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

function College() {
  const [open, setOpen] = useState(false);

  const columns = ["College Name", "Contact Number", "Total Courses", "Action"];
  const rows = [
    {
      sn: "1",
      cName: "Christ College of Science and Management",
      cNumber: "+91 989382389",
      tCourses: "49",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      cName: "Christ College of Science and Management",
      cNumber: "+91 989382389",
      tCourses: "49",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      cName: "Christ College of Science and Management",
      cNumber: "+91 989382389",
      tCourses: "49",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      cName: "Christ College of Science and Management",
      cNumber: "+91 989382389",
      tCourses: "49",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      cName: "Christ College of Science and Management",
      cNumber: "+91 989382389",
      tCourses: "49",
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
          <span style={{ fontSize: "14px" }}>Search by college name</span>
          <TextField
            id="outlined-basic"
            label="Name"
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
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>150</span>
          <p style={{ padding: "0px", margin: "0px", fontSize: "14px" }}>
            Total Colleges
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
            Create College
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
            <h3>All Colleges</h3>
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
                <h3>Create College</h3>
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
                <h4>College Details</h4>
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
                    label="College Name"
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
                    label="College Short Code"
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
                  <TextField
                    id="outlined-basic"
                    label="Phone"
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
                    label="Email"
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
                <TextField
                  id="outlined-basic"
                  label="Website"
                  variant="outlined"
                  style={{ width: "100%", marginTop: "10px" }}
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
              <div style={{ padding: "0px 20px 0px 20px" }}>
                <h4>Courses</h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
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
                    <option value="">Select Course</option>
                    <option value="option1">BCA</option>
                    <option value="option2">MBA</option>
                    <option value="option3"> BBA</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  padding: "0px 20px",
                  marginTop: "10px",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Admission Fee"
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
                  label="Service Charge"
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
              <div style={{ padding: "0px 20px 0px 20px" }}>
                <h4>Tution Fee</h4>
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
                    label="Year One"
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
                    label="Year Two"
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
                  <TextField
                    id="outlined-basic"
                    label="Year Three"
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
                    label="Year Four"
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
              <div style={{ padding: "0px 20px 0px 20px" }}>
                <h4>Hostel Fee</h4>
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
                    label="Year One"
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
                    label="Year Two"
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
                  <TextField
                    id="outlined-basic"
                    label="Year Three"
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
                    label="Year Four"
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

export default College;
