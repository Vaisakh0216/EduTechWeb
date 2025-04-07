import { Button, Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/atoms/Table";
import Drawer from "../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../config/axiosConfig";
import { listColleges } from "../../services/listColleges";
import { listAgents } from "../../services/listAgents";
import { createStudent } from "../../services/createStudent";
import { createAdmission } from "../../services/createAdmission";
import { listCourses } from "../../services/listCourses";
import moment from "moment";
import { format } from "date-fns";

function Onboard() {
  const [open, setOpen] = useState(false);
  const columns = [
    "Admission Number",
    "Student Name",
    "College Name",
    "Date",
    "Course",
  ];
  const [startDate, setStartDate] = useState();
  const [admission, setAdmission] = useState([]);
  const [admissionCompleteList, setAdmissionCompleteList] = useState([]);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    religion: "",
    plus_two_stream: "",
    parent_phone_1: "",
    parent_phone_2: "",
    address: "",
    institute_id: "",
    course_id: "",
  });
  const [admissionData, setAdmissionData] = useState({
    student_id: "",
    institute_id: "",
    course_id: "",
    status: "pending",
    branch_id: "1",
    agent_id: "",
  });
  const [admissionDate, setAdmissionDate] = useState(new Date());
  const [dobDate, setDobDate] = useState(new Date());
  const [collegeList, setCollegeList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [courseDetail, setCourseDetail] = useState();
  const [totalFeeToPay, setTotalFeeToPay] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("students");
      setAdmissionCompleteList(res?.data);
      setAdmission(
        res?.data?.map((item) => ({
          aNumber: item?.id,
          Name: item?.first_name,
          CollegeName: collegeList?.filter(
            (res) => res?.id == item?.institute_id
          )[0]?.name,
          admissionDate: format(item?.created_at, "dd-MM-yyyy"),
          course: courseList?.filter((res) => res?.id == item?.course_id)[0]
            ?.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collegeList, courseList]);

  useEffect(() => {
    const getCollegelist = async () => {
      try {
        const res = await listColleges();
        setCollegeList(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const getCourseList = async () => {
      try {
        const res = await listCourses();
        setCourseList(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getCollegelist();
    getCourseList();
  }, []);

  useEffect(() => {
    const getAgentlist = async () => {
      try {
        const res = await listAgents();
        setAgentList(res?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAgentlist();
  }, []);

  const handleStudent = (e) => {
    const { name, value } = e.target;
    setStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdmission = (e) => {
    const { name, value } = e.target;
    setAdmissionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setCourseDetail(
      collegeList
        ?.filter((item) => item?.id == admissionData?.institute_id)[0]
        ?.course_fees?.filter(
          (fee) => fee?.course_id == admissionData?.course_id
        )[0]
    );
  }, [admissionData?.course_id]);

  const Duration = Number(
    collegeList
      ?.filter((item) => item?.id == admissionData?.institute_id)[0]
      ?.courses?.filter((val) => val?.id == admissionData?.course_id)[0]
      ?.duration
  );

  const handleSubmit = () => {
    const studentPayload = {
      first_name: studentData?.first_name,
      last_name: studentData?.last_name,
      email: studentData?.email,
      dob: format(dobDate, "dd-MM-yyyy"),
      course_id: admissionData?.course_id,
      gender: studentData?.gender,
      institute_id: admissionData?.institute_id,
      phone: studentData?.phone,
      religion: studentData?.religion,
      plus_two_stream: studentData?.plus_two_stream,
      parent_phone_1: studentData?.parent_phone_1,
      parent_phone_2: studentData?.parent_phone_2,
    };
    createStudent(studentPayload).then((res) => {
      const admissionPayload = {
        student_id: res?.id,
        institute_id: admissionData?.institute_id,
        course_id: admissionData?.course_id,
        admission_date: format(admissionDate, "yyyy-MM-dd"),
        status: admissionData?.status,
        branch_id: admissionData?.branch_id,
        agent_id: admissionData?.agent_id,
      };
      createAdmission(admissionPayload);
    });
  };

  const getDetail = (res) => {
    setOpen(true);
  };

  useEffect(() => {
    setTotalFeeToPay(
      (Number(courseDetail?.admission_fee) || 0) +
        (Number(courseDetail?.hostel_term_1) || 0) +
        (Number(courseDetail?.hostel_term_2) || 0) +
        (Number(courseDetail?.hostel_term_3) || 0) +
        (Number(courseDetail?.hostel_term_4) || 0) +
        (Number(courseDetail?.service_charge) || 0) +
        (Number(courseDetail?.tuition_term_1) || 0) +
        (Number(courseDetail?.tuition_term_2) || 0) +
        (Number(courseDetail?.tuition_term_3) || 0) +
        (Number(courseDetail?.tuition_term_4) || 0)
    );
  });

  useEffect(() => {
    if (admissionNumber.length) {
      setAdmission(admission.filter((res) => res?.aNumber == admissionNumber));
    } else {
      fetchData();
    }
  }, [admissionNumber]);

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
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}
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
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            {admissionCompleteList?.length}
          </span>
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
          {/* <div
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
          </div> */}
        </div>
        <BasicTable
          columns={columns}
          rows={admission}
          onClickFunction={getDetail}
        />
      </div>
      {open && (
        <Drawer
          open={open}
          setOpen={setOpen}
          content={
            <div style={{ color: "black", overflowY: "auto" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px",
                  borderBottom: "1px solid gray",
                }}
              >
                <h3>Create Admission</h3>
                <ClearIcon onClick={() => setOpen(false)} />
              </div>
              <div style={{ padding: "50px 20px" }}>
                {/* Admission Date Container Start */}
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>Admission Date</label>
                    <DatePicker
                      className="admissionDate"
                      selected={admissionDate}
                      onChange={(date) => setAdmissionDate(date)}
                      placeholderText="DD-MM-YYYY"
                    />
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>Select Branch</label>
                    <select
                      id="my-select"
                      name="branch_id"
                      style={{
                        height: "40px",
                        borderRadius: "8px",
                        borderColor: "lightgray",
                      }}
                      value={admissionData?.branch_id}
                      onChange={handleAdmission}
                    >
                      <option value="1">Pulpalli</option>
                      <option value="2">Mysore</option>
                      <option value="2">Sultan Bathery</option>
                    </select>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>Year</label>
                    <select
                      id="my-select"
                      name="branch_id"
                      style={{
                        height: "40px",
                        borderRadius: "8px",
                        borderColor: "lightgray",
                      }}
                      value={admissionData?.branch_id}
                      onChange={handleAdmission}
                    >
                      <option value="1">2024-2025</option>
                      <option value="1">2025-2026</option>
                    </select>
                  </div>
                </div>
                {/* Admission Date Container Close */}
                <div>
                  <h4>Student Detail</h4>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      name="first_name"
                      label="First Name"
                      variant="outlined"
                      value={studentData?.first_name}
                      onChange={handleStudent}
                      sx={{
                        width: "100%",
                        zIndex: "0",
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
                    <TextField
                      id="outlined-basic"
                      name="last_name"
                      label="Last Name"
                      variant="outlined"
                      value={studentData?.last_name}
                      onChange={handleStudent}
                      sx={{
                        width: "100%",
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
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <TextField
                      id="outlined-basic"
                      name="email"
                      label="Email"
                      variant="outlined"
                      value={studentData?.email}
                      onChange={handleStudent}
                      sx={{
                        width: "100%",
                        zIndex: "0",
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
                    <TextField
                      id="outlined-basic"
                      name="phone"
                      label="Phone"
                      variant="outlined"
                      value={studentData?.phone}
                      onChange={handleStudent}
                      sx={{
                        width: "100%",
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
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <DatePicker
                      className="dob-datepicker"
                      selected={dobDate}
                      onChange={(date) => setDobDate(date)}
                      placeholderText="DOB"
                    />
                    <select
                      id="my-select"
                      name="gender"
                      style={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "8px",
                        borderColor: "lightgray",
                      }}
                      value={studentData?.gender}
                      onChange={handleStudent}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <select
                      id="my-select"
                      name="religion"
                      style={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "8px",
                        borderColor: "lightgray",
                      }}
                      value={studentData?.religion}
                      onChange={handleStudent}
                    >
                      <option value="">Select Religion</option>
                      <option value="Humanity">Humanity</option>
                      <option value="Christian">Christian</option>
                      <option value="Hinduism">Hinduism</option>
                      <option value="Islam">Islam</option>
                    </select>
                    <select
                      id="my-select"
                      name="plus_two_stream"
                      style={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "8px",
                        borderColor: "lightgray",
                      }}
                      value={studentData?.plus_two_stream}
                      onChange={handleStudent}
                    >
                      <option value="">Select +2 Stream</option>
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                      <option value="Economics">Economics</option>
                    </select>
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <TextField
                      id="outlined-basic"
                      name="parent_phone_1"
                      label="Parent Primary Phone"
                      variant="outlined"
                      value={studentData?.parent_phone_1}
                      onChange={handleStudent}
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-root": {
                          height: "45px",
                          borderRadius: "8px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-5px",
                          fontSize: "14px",
                        },
                      }}
                    />{" "}
                    <TextField
                      id="outlined-basic"
                      name="parent_phone_2"
                      label="Parent Secondary Phone"
                      variant="outlined"
                      value={studentData?.parent_phone_2}
                      onChange={handleStudent}
                      sx={{
                        width: "100%",
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
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <TextField
                      id="outlined-basic"
                      name="address"
                      label="Address"
                      variant="outlined"
                      value={studentData?.address}
                      onChange={handleStudent}
                      sx={{
                        width: "100%",
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
                    <TextField
                      id="outlined-basic"
                      name="address"
                      label="Reference"
                      variant="outlined"
                      value={studentData?.address}
                      onChange={handleStudent}
                      sx={{
                        width: "100%",
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
                </div>
                <div>
                  <h4>Course Details</h4>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <select
                      id="my-select"
                      name="institute_id"
                      style={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "8px",
                        borderColor: "lightgray",
                      }}
                      value={admissionData?.institute_id}
                      onChange={handleAdmission}
                    >
                      <option value="">Select College</option>

                      {collegeList?.map((college) => (
                        <option value={college?.id}>{college?.name}</option>
                      ))}
                    </select>
                    <select
                      id="my-select"
                      name="course_id"
                      style={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "8px",
                        borderColor: "lightgray",
                      }}
                      value={admissionData?.course_id}
                      onChange={handleAdmission}
                    >
                      <option value="">Select Course</option>
                      {collegeList
                        ?.filter(
                          (item) => item?.id == admissionData?.institute_id
                        )[0]
                        ?.courses?.map((course) => (
                          <option value={course?.id}>{course?.name}</option>
                        ))}
                    </select>
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    {Duration
                      ? Array(Duration)
                          .fill(null)
                          .map((_, index) => (
                            <TextField
                              key={index + 1}
                              id={`tuition_term_${index + 1}`}
                              name={`tuition_term_${index + 1}`}
                              label={`tuition_term_${index + 1}`}
                              variant="outlined"
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                              value={
                                courseDetail
                                  ? courseDetail?.[`tuition_term_${index + 1}`]
                                  : ""
                              }
                              sx={{
                                width: "100%",
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
                          ))
                      : ""}
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    {Duration
                      ? Array(Duration)
                          .fill(null)
                          .map((_, index) => (
                            <TextField
                              key={index + 1}
                              id={`hostel_term_${index + 1}`}
                              name={`hostel_term_${index + 1}`}
                              label={`hostel_term_${index + 1}`}
                              variant="outlined"
                              slotProps={{
                                inputLabel: { shrink: true },
                              }}
                              value={
                                courseDetail
                                  ? courseDetail?.[`hostel_term_${index + 1}`]
                                  : ""
                              }
                              sx={{
                                width: "100%",
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
                          ))
                      : ""}
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <select
                      id="my-select"
                      name="agent_id"
                      style={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "8px",
                        borderColor: "lightgray",
                      }}
                      value={admissionData?.agent_id}
                      onChange={handleAdmission}
                    >
                      <option value="">Select Aent</option>
                      {agentList?.map((agent, index) => (
                        <option value={index + 1}>{agent?.name}</option>
                      ))}
                    </select>
                    <TextField
                      id="outlined-basic"
                      label="Agent Fee"
                      variant="outlined"
                      sx={{
                        width: "100%",
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
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "end",
                    bottom: 0,
                    right: 0,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      marginRight: "10px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Total Amount : {totalFeeToPay}
                  </div>

                  <Button
                    variant="outlined"
                    onClick={() => setOpen(false)}
                    style={{ textTransform: "inherit" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: "10px", textTransform: "inherit" }}
                    onClick={() => handleSubmit()}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

export default Onboard;
