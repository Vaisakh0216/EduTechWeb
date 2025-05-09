import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicTable from "../../../components/atoms/Table";
import Drawer from "../../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createCourse } from "../../../services/createCourse";
import CustomCircularProgress from "../../../components/atoms/CircularProgress";
import { listCourses } from "../../../services/listCourses";
import { listUniversities } from "../../../services/listUniversities";
import courseImage from "../../../assets/course.jpg";

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
  const [courseList, setCourseList] = useState([]);
  const [universityList, setUniversityList] = useState([]);
  const [createOrEdit, setCreateOrEdit] = useState("");
  const columns = ["Course Name", "Course Code", "Course Duration"];

  const validateForm = () => {
    let isValid = true;
    let tempErrors = {
      courseName: "",
      courseCode: "",
      courseDuration: "",
      university: "",
    };

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
    const payload = {
      name: courseName,
      short_code: courseCode,
      duration: courseDuration,
      university_id: university,
    };
    if (validateForm()) {
      setLoading(true);
      createCourse(payload).then((res) => {
        setLoading(false);
        setOpen(false);
        getCourselist();
        setCourseName("");
        setCourseCode("");
        setCourseDuration("");
        setUniversity("");
      });
    }
  };

  const getCourselist = () => {
    const universityMap = new Map();
    universityList?.forEach((uni) => {
      universityMap && universityMap.set(uni.id, uni.name);
    });

    listCourses().then((res) => {
      setCourseList(
        res?.map((item) => {
          const universityName = universityMap.get(item?.university_id);
          return {
            name: universityName
              ? `${item?.name} / ${universityName}`
              : item?.name,
            short_code: item?.short_code,
            duration: item?.duration + " " + "Years",
          };
        })
      );
    });
  };

  useEffect(() => {
    getCourselist();
  }, [universityList]);

  useEffect(() => {
    listUniversities().then((res) => setUniversityList(res));
  }, []);

  const getCourseDetails = (res) => {
    setCreateOrEdit("detail");
    setOpen(true);
    setCourseName(res?.name?.split("/")[0]);
    setCourseCode(res?.short_code);
    setCourseDuration(res?.duration);
    setUniversity(res?.name?.split("/")[1]);

    console.log("the res", res);
  };

  console.log("course name exist", courseName);

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
            onClick={() => {
              setOpen(true);
              setCreateOrEdit("create");
              setCourseCode("");
              setCourseDuration("");
              setCourseName("");
              setUniversity("");
            }}
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
        <div>
          <BasicTable
            columns={columns}
            rows={courseList}
            onClickFunction={getCourseDetails}
          />
        </div>
      </div>
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
                <h3>
                  {createOrEdit === "create"
                    ? "Create Course"
                    : "Update Course"}
                </h3>
                <ClearIcon
                  onClick={() => setOpen(false)}
                  style={{ cursor: "pointer" }}
                />
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
                  }}
                >
                  {/* <div
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
                  </div> */}
                  <img
                    src={courseImage}
                    style={{
                      backgroundColor: "blue",
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%", // Make the outer div a circle
                    }}
                  />
                </div>
              </div>
              <div style={{ padding: "20px 20px 0px 20px" }}>
                {createOrEdit === "create" ? (
                  <>
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
                          onChange={(e) => {
                            setCourseName(e.target.value);
                          }}
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
                      <FormControl
                        fullWidth
                        error={Boolean(errors.courseDuration)}
                      >
                        <select
                          id="my-select"
                          style={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "8px",
                            border: "1px solid lightgray",
                            padding: "10px",
                            fontSize: "16px",
                          }}
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                        >
                          <option value="">Select Duration</option>
                          <option value="1">1 Year</option>
                          <option value="2">2 Years</option>
                          <option value="3">3 Years</option>
                          <option value="4"> 4 Years</option>
                          <option value="5"> 5 Years</option>
                        </select>
                        {errors.courseDuration && (
                          <FormHelperText>
                            {errors.courseDuration}
                          </FormHelperText>
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
                            fontSize: "16px",
                          }}
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                        >
                          <option value="">Select University</option>
                          {universityList?.length &&
                            universityList?.map((uni) => (
                              <option id={uni?.id} value={uni?.id}>
                                {uni?.name}
                              </option>
                            ))}
                        </select>
                        {errors.university && (
                          <FormHelperText>{errors.university}</FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginTop: "50px" }}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "50%",
                          }}
                        >
                          <h4
                            style={{ padding: 0, margin: 0, fontSize: "14px" }}
                          >
                            Course Name
                          </h4>
                          <p
                            style={{
                              padding: 0,
                              margin: "10px 0px",
                              textAlign: "center",
                              fontSize: "14px",
                            }}
                          >
                            {courseName}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "50%",
                          }}
                        >
                          <h4
                            style={{ padding: 0, margin: 0, fontSize: "14px" }}
                          >
                            Course Short Code
                          </h4>
                          <p
                            style={{
                              padding: 0,
                              margin: "10px 0px",
                              fontSize: "14px",
                            }}
                          >
                            {courseCode}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "50px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "50%",
                          }}
                        >
                          <h4
                            style={{ padding: 0, margin: 0, fontSize: "14px" }}
                          >
                            Course Duration
                          </h4>
                          <p
                            style={{
                              padding: 0,
                              margin: "10px 0px",
                              fontSize: "14px",
                            }}
                          >
                            {courseDuration}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "50%",
                          }}
                        >
                          <h4
                            style={{ padding: 0, margin: 0, fontSize: "14px" }}
                          >
                            University
                          </h4>
                          <p
                            style={{
                              padding: 0,
                              margin: "10px 0px",
                              fontSize: "14px",
                            }}
                          >
                            {university}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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

export default Course;
