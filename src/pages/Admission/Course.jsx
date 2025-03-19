import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";
import BasicTable from "../../components/atoms/Table";
import Drawer from "../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { createCourse } from "../../services/createCourse";
import CustomCircularProgress from "../../components/atoms/CircularProgress";

function Course() {
  const [open, setOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [university, setUniversity] = useState("");
  const [errors, setErrors] = useState({
    courseName: "",
    courseCode: "",
    courseDuration: "",
    university: "",
  });
  const [loading, setLoading] = useState(false);
  const columns = ["Course Name", "Course Code", "Course Duration", "Action"];
  const rows = [
    {
      cName: "Bachelor of Arts",
      cNumber: "BA",
      tCourses: "3",
      actions: <DeleteIcon />,
    },
    {
      cName: "Bachelor of Commerce",
      cNumber: "B.Com",
      tCourses: "3",
      actions: <DeleteIcon />,
    },
    {
      cName: "Bachelor of Business Administration",
      cNumber: "BBA",
      tCourses: "3",
      actions: <DeleteIcon />,
    },
    {
      cName: "Bachelor of Hotel Management",
      cNumber: "BHM",
      tCourses: "4",
      actions: <DeleteIcon />,
    },
    {
      cName: "Bachelor of Computer Application (BCA)",
      cNumber: "+91 989382389",
      tCourses: "3",
      actions: <DeleteIcon />,
    },
  ];

  const validateForm = () => {
    let isValid = true;
    let tempErrors = {
      courseName: "",
      courseCode: "",
      courseDuration: "",
      university: "",
    };

    // Validate Course Name
    if (!courseName) {
      tempErrors.courseName = "Course Name is required.";
      isValid = false;
    }

    // Validate Course Code
    if (!courseCode) {
      tempErrors.courseCode = "Course Code is required.";
      isValid = false;
    }

    // Validate Course Duration
    if (!courseDuration) {
      tempErrors.courseDuration = "Course Duration is required.";
      isValid = false;
    }

    // Validate University
    if (!university) {
      tempErrors.university = "University is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    setLoading(true);
    const payload = {
      name: courseName,
      short_code: courseCode,
      duration: courseDuration,
      university_id: 1,
    };
    if (validateForm()) {
      createCourse(payload).then((res) => {
        setLoading(false);
        setOpen(false);
      });
    }
  };

  console.log(
    "the details",
    courseCode,
    courseDuration,
    courseName,
    university
  );

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
                  <FormControl
                    error={Boolean(errors.courseName)}
                    style={{ width: "100%" }}
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
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                    {errors.courseName && (
                      <FormHelperText>{errors.courseName}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    error={Boolean(errors.courseCode)}
                    style={{ width: "100%" }}
                  >
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
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                    />
                    {errors.courseCode && (
                      <FormHelperText>{errors.courseCode}</FormHelperText>
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
                  <FormControl fullWidth error={Boolean(errors.courseDuration)}>
                    <select
                      id="my-select"
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "8px",
                        border: "1px solid lightgray",
                        padding: "10px",
                      }}
                      value={courseDuration}
                      onChange={(e) => setCourseDuration(e.target.value)}
                    >
                      <option value="">Select Duration</option>
                      <option value="option1">2</option>
                      <option value="option2">3</option>
                      <option value="option3"> 4</option>
                      <option value="option3"> 5</option>
                    </select>
                    {errors.courseDuration && (
                      <FormHelperText>{errors.courseDuration}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth error={Boolean(errors.university)}>
                    <select
                      id="my-select"
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "8px",
                        border: "1px solid lightgray",
                        padding: "10px",
                      }}
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    >
                      <option value="">Select University</option>
                      <option value="option1">2</option>
                      <option value="option2">3</option>
                      <option value="option3"> 4</option>
                      <option value="option3"> 5</option>
                    </select>
                    {errors.university && (
                      <FormHelperText>{errors.university}</FormHelperText>
                    )}
                  </FormControl>
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
            </div>
          }
        />
      )}
    </div>
  );
}

export default Course;
