import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/atoms/Table";
import Drawer from "../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { listColleges } from "../../services/listColleges";
import { listAgents } from "../../services/listAgents";
import { createStudent } from "../../services/createStudent";
import { createAdmission } from "../../services/createAdmission";
import { listCourses } from "../../services/listCourses";
import { format } from "date-fns";
import { listAdmissions } from "../../services/listAdmissions";
import { createAgentFee } from "../../services/createAgentFee";
import { updateCourseFee } from "../../services/updateCourseFee";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CreateIcon from "@mui/icons-material/Create";

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
    reference: "",
  });
  const [admissionData, setAdmissionData] = useState({
    student_id: "",
    institute_id: "",
    course_id: "",
    status: "pending",
    branch_id: "1",
    agent_id: "",
  });
  const [agentFeelist, setAgentFeelist] = useState({
    main: {
      admission_id: "",
      agent_id: "",
      amount: "",
      status: "pending",
    },
    sub: {
      admission_id: "",
      agent_id: "",
      amount: "",
      status: "pending",
    },
    college: {
      admission_id: "",
      agent_id: "",
      amount: "",
      status: "pending",
    },
  });
  const [admissionDate, setAdmissionDate] = useState(new Date());
  const [dobDate, setDobDate] = useState(new Date());
  const [collegeList, setCollegeList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [courseDetail, setCourseDetail] = useState();
  const [totalFeeToPay, setTotalFeeToPay] = useState(0);
  const [createOrEdit, setCreateOrEdit] = useState("");

  const fetchData = async () => {
    try {
      const res = await listAdmissions();
      setAdmissionCompleteList(res?.data);
      setAdmission(
        res?.data?.map((item) => ({
          aNumber: item?.id,
          Name: item?.student?.first_name,
          CollegeName: item?.institute?.name,
          admissionDate: format(item?.admission_date, "dd-MM-yyyy"),
          course: item?.course?.name,
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
        setAgentList(res);
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

  const handleChange = (section, field, value) => {
    setAgentFeelist((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
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
    const { id, ...rest } = courseDetail;
    updateCourseFee(rest, id).then((res) => {
      const admissionPayload = {
        first_name: studentData?.first_name,
        last_name: studentData?.last_name,
        email: studentData?.email,
        dob: format(dobDate, "dd-MM-yyyy"),
        academic_year: "2025",
        course_id: admissionData?.course_id,
        institute_id: admissionData?.institute_id,
        gender: studentData?.gender,
        admission_date: format(admissionDate, "yyyy-MM-dd"),
        phone: studentData?.phone,
        religion: studentData?.religion,
        plus_two_stream: studentData?.plus_two_stream,
        parent_phone_1: studentData?.parent_phone_1,
        parent_phone_2: studentData?.parent_phone_2,
        "agents[0][id]": agentFeelist["main"]?.agent_id,
        "agents[0][fee]": agentFeelist["main"]?.amount,
        "agents[1][id]": agentFeelist["sub"]?.agent_id,
        "agents[1][fee]": agentFeelist["sub"]?.amount,
        "agents[2][id]": agentFeelist["college"]?.agent_id,
        "agents[2][fee]": agentFeelist["college"]?.amount,
        status: admissionData?.status,
        branch_id: admissionData?.branch_id,
        ref_platform: studentData?.reference,
        address: studentData?.address,
      };
      const convertToFormData = (payload) => {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value);
        });
        return formData;
      };

      createAdmission(convertToFormData(admissionPayload)).then((res) => {
        fetchData();
        setOpen(false);
      });
    });
  };

  const getDetail = (res, rowIndex) => {
    setOpen(true);
    setCreateOrEdit("detail");
    console.log("this is res", admissionCompleteList[rowIndex]);
    setStudentData({
      address: admissionCompleteList[rowIndex]?.student?.address,
      course_id: admissionCompleteList[rowIndex]?.course_id,
      dob: admissionCompleteList[rowIndex]?.student?.dob,
      email: admissionCompleteList[rowIndex]?.student?.email,
      first_name: admissionCompleteList[rowIndex]?.student?.first_name,
      gender: admissionCompleteList[rowIndex]?.student?.gender,
      institute_id: admissionCompleteList[rowIndex]?.institute_id,
      last_name: admissionCompleteList[rowIndex]?.student?.last_name,
      parent_phone_1: admissionCompleteList[rowIndex]?.student?.parent_phone_1,
      parent_phone_2: admissionCompleteList[rowIndex]?.student?.parent_phone_2,
      phone: admissionCompleteList[rowIndex]?.student?.phone,
      plus_two_stream:
        admissionCompleteList[rowIndex]?.student?.plus_two_stream,
      reference: admissionCompleteList[rowIndex]?.student?.ref_platform,
      religion: admissionCompleteList[rowIndex]?.student?.religion,
    });
    setAdmissionData({
      agent_id: admissionCompleteList[rowIndex]?.agent_id,
      branch_id: admissionCompleteList[rowIndex]?.branch_id,
      course_id: admissionCompleteList[rowIndex]?.course_id,
      institute_id: admissionCompleteList[rowIndex]?.institute_id,
      status: admissionCompleteList[rowIndex]?.status,
      student_id: admissionCompleteList[rowIndex]?.student?.id,
    });
  };

  useEffect(() => {
    setTotalFeeToPay(
      // (Number(courseDetail?.admission_fee) || 0) +
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

  const handleCourseDetailChange = (e) => {
    const { name, value } = e.target;
    setCourseDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontWeight: "600" }}> Admissions</h2>
          </div>
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
              variant="contained"
              style={{
                background: "linear-gradient(to right, #14ADD6, #384295)",
                fontSize: "14px",
                textTransform: "inherit",
                cursor: "pointer",
                padding: "10px 30px",
                borderRadius: "8px",
                height: "40px",
              }}
              onClick={() => {
                setOpen(true);
                setCreateOrEdit("create");
              }}
            >
              Create Admission
            </Button>
          </div>
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
                <h3>
                  {createOrEdit === "detail"
                    ? "Update Admission"
                    : "Create Admission"}
                </h3>{" "}
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
              <div style={{ padding: "50px 20px" }}>
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
                    >
                      <option value="1">Mysore</option>
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                        zIndex: 0,
                        "& .MuiInputBase-root": {
                          height: "45px",
                          borderRadius: "8px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-5px",
                          fontSize: "14px",
                        },
                      }}
                      disabled={createOrEdit == "detail"}
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
                        zIndex: 0,
                        "& .MuiInputBase-root": {
                          height: "45px",
                          borderRadius: "8px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-5px",
                          fontSize: "14px",
                        },
                      }}
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
                    />
                    <TextField
                      id="outlined-basic"
                      name="reference"
                      label="Reference"
                      variant="outlined"
                      value={studentData?.reference}
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                      disabled={createOrEdit == "detail"}
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
                              onChange={handleCourseDetailChange}
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
                              disabled={createOrEdit == "detail"}
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
                              onChange={handleCourseDetailChange}
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
                              disabled={createOrEdit == "detail"}
                            />
                          ))
                      : ""}
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <select
                      id="my-select"
                      style={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "8px",
                        borderColor: "lightgray",
                      }}
                      value={agentFeelist.main.agent_id}
                      onChange={(e) =>
                        handleChange("main", "agent_id", e.target.value)
                      }
                      disabled={createOrEdit == "detail"}
                    >
                      <option value="">Select Main Aent</option>
                      {agentList
                        ?.filter((main) => main?.agent_type === "Main")
                        .map((res, index) => (
                          <option key={index} value={index + 1}>
                            {res?.name}
                          </option>
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
                      value={agentFeelist.main.amount}
                      onChange={(e) =>
                        handleChange("main", "amount", e.target.value)
                      }
                      disabled={createOrEdit == "detail"}
                    />
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
                      value={agentFeelist.sub.agent_id}
                      onChange={(e) =>
                        handleChange("sub", "agent_id", e.target.value)
                      }
                      disabled={createOrEdit == "detail"}
                    >
                      <option value="">Select Sub Aent</option>
                      {agentList
                        ?.filter((main) => main?.agent_type === "Sub")
                        .map((res, index) => (
                          <option key={index} value={index + 1}>
                            {res?.name}
                          </option>
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
                      value={agentFeelist.sub.amount}
                      onChange={(e) =>
                        handleChange("sub", "amount", e.target.value)
                      }
                      disabled={createOrEdit == "detail"}
                    />
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
                      value={agentFeelist.college.agent_id}
                      onChange={(e) =>
                        handleChange("college", "agent_id", e.target.value)
                      }
                      disabled={createOrEdit == "detail"}
                    >
                      <option value="">Select College Aent</option>
                      {agentList
                        ?.filter((main) => main?.agent_type === "College")
                        .map((res, index) => (
                          <option key={index} value={index + 1}>
                            {res?.name}
                          </option>
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
                      value={agentFeelist.college.amount}
                      onChange={(e) =>
                        handleChange("college", "amount", e.target.value)
                      }
                      disabled={createOrEdit == "detail"}
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
