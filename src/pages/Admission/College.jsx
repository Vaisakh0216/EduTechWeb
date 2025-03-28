import { Button, FormHelperText, TextField, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicTable from "../../components/atoms/Table";
import Drawer from "../../components/atoms/Drawer";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { listColleges } from "../../services/listColleges";
import AddIcon from "@mui/icons-material/Add";
import SimpleDialogDemo from "../../components/atoms/DialogBox";
import { listCourses } from "../../services/listCourses";
import CreateIcon from "@mui/icons-material/Create";
import { createCollege } from "../../services/createCollege";
import { createCourseFee } from "../../services/createCourseFee";
import { updateCollege } from "../../services/updateCollege";
import collegeImage from "../../assets/college.jpg";

function College() {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [collegeDetails, setCollegeDetails] = useState({
    name: "",
    short_code: "",
    phone: "",
    email: "",
    website: "",
    course_offered: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    short_code: "",
    phone: "",
    email: "",
    website: "",
  });
  const [collegeList, setCollegeList] = useState([]);
  const [entireCollegeList, setEntireCollegeList] = useState([]);
  const [courseList, setCourselist] = useState([]);
  const [courseDetail, setCourseDetail] = useState({
    course_id: "",
    institute_id: "",
    admission_fee: "",
    service_charge: "",
    tuition_term_1: "",
    tuition_term_2: "",
    tuition_term_3: "",
    tuition_term_4: "",
    tuition_term_5: "",
    hostel_term_1: "",
    hostel_term_2: "",
    hostel_term_3: "",
    hostel_term_4: "",
    hostel_term_5: "",
  });
  const [tutionFee, setTutionFee] = useState();
  const [hostelFee, setHostelFee] = useState();
  const [selectedCourse, setSelectedCourse] = useState(0);
  const [selectedCollege, setSelectedCollege] = useState();
  const [createOrEdit, setCreateOrEdit] = useState("");
  const [loading, setLoading] = useState(false);
  const columns = ["College Name", "Contact Number", "Total Courses"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollegeDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setTutionFee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHostelFeeChange = (e) => {
    const { name, value } = e.target;
    setHostelFee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("the tution fee", tutionFee, hostelFee);

  const getCollegelist = () => {
    listColleges().then((res) => {
      console.log(res);
      setEntireCollegeList(res);
      setCollegeList(
        res?.map((item) => {
          return {
            name: item?.name,
            phone: item?.phone,
            totalCourses: "10",
          };
        })
      );
    });
  };

  useEffect(() => {
    getCollegelist();
  }, []);

  useEffect(() => {
    listCourses().then((res) => setCourselist(res));
  }, [openDialog]);

  const validateForm = () => {
    let isValid = true;
    let tempErrors = {
      name: "",
      short_code: "",
      phone: "",
      email: "",
      website: "",
    };

    if (!collegeDetails?.name) {
      tempErrors.name = "College Name is required.";
      isValid = false;
    }

    if (!collegeDetails?.short_code) {
      tempErrors.short_code = "College Code is required.";
      isValid = false;
    }

    // Validate Course Duration
    if (!collegeDetails?.phone) {
      tempErrors.phone = "Phone number is required.";
      isValid = false;
    }

    if (!collegeDetails?.email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    const payload = {
      name: collegeDetails?.name,
      short_code: collegeDetails?.short_code,
      email: collegeDetails?.email,
      phone: collegeDetails?.phone,
      course_offered: "",
    };
    if (validateForm()) {
      console.log("the payload", payload);
      setLoading(true);
      createCollege(payload).then((res) => {
        setLoading(false);
        setOpen(false);
        getCollegelist();
      });
    }
  };

  const handleCourseSubmit = () => {
    const payload = {
      course_id: courseDetail?.course_id,
      institute_id: selectedCollege?.id,
      admission_fee: courseDetail?.admission_fee,
      service_charge: courseDetail?.service_charge,
      ...Object.keys(tutionFee).reduce((acc, key) => {
        acc[key] = tutionFee[key];
        return acc;
      }, {}),
      ...Object.keys(hostelFee).reduce((acc, key) => {
        acc[key] = hostelFee[key];
        return acc;
      }, {}),
    };

    const collegePayload = {
      name: selectedCollege?.name,
      short_code: selectedCollege?.short_code,
      email: selectedCollege?.email,
      phone: selectedCollege?.phone,
      course_offered: selectedCollege?.course_offered?.length
        ? selectedCollege?.course_offered?.concat(",", courseDetail?.course_id)
        : courseDetail?.course_id,
    };
    updateCollege(collegePayload, selectedCollege?.id);
    createCourseFee(payload).then((res) => {
      setOpenDialog(false);
      getCollegelist();
      setOpen(false);
    });
  };

  const getCollegeDetail = (res) => {
    setOpen(true);
    setCreateOrEdit("detail");
    const data = entireCollegeList.find((col) => col?.name === res?.name);
    setSelectedCollege(data);
  };

  const Duration = Number(
    courseList?.find((item) => item?.id == courseDetail?.course_id)?.duration
  );

  console.log("the course detail", courseDetail, selectedCollege);

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
            onClick={() => {
              setOpen(true);
              setCreateOrEdit("create");
              setSelectedCollege();
              setCourseDetail();
            }}
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
        <BasicTable
          columns={columns}
          rows={collegeList}
          onClickFunction={getCollegeDetail}
        />
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
                <h3>
                  {createOrEdit === "detail"
                    ? "Update College"
                    : "Create College"}
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
                    src={collegeImage}
                    style={{
                      backgroundColor: "blue",
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%", // Make the outer div a circle
                    }}
                  />
                </div>
              </div>
              <>
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
                    <FormControl
                      error={Boolean(errors.name)}
                      style={{ width: "100%" }}
                    >
                      <TextField
                        id="outlined-basic"
                        name="name"
                        label="College Name"
                        variant="outlined"
                        style={{ width: "100%" }}
                        disabled={selectedCollege}
                        value={
                          selectedCollege
                            ? selectedCollege?.name
                            : collegeDetails?.name
                        }
                        onChange={handleChange}
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
                      {errors.name && (
                        <FormHelperText>{errors.name}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      error={Boolean(errors.short_code)}
                      style={{ width: "100%" }}
                    >
                      <TextField
                        id="outlined-basic"
                        name="short_code"
                        label="College Short Code"
                        variant="outlined"
                        style={{ width: "100%" }}
                        disabled={selectedCollege}
                        value={
                          selectedCollege
                            ? selectedCollege?.short_code
                            : collegeDetails?.short_code
                        }
                        onChange={handleChange}
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
                      {errors.short_code && (
                        <FormHelperText>{errors.short_code}</FormHelperText>
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
                        name="phone"
                        label="Phone"
                        variant="outlined"
                        style={{ width: "100%" }}
                        disabled={selectedCollege}
                        value={
                          selectedCollege
                            ? selectedCollege?.phone
                            : collegeDetails?.phone
                        }
                        onChange={handleChange}
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
                      {errors.phone && (
                        <FormHelperText>{errors.phone}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      error={Boolean(errors.email)}
                      style={{ width: "100%" }}
                    >
                      <TextField
                        id="outlined-basic"
                        name="email"
                        label="Email"
                        variant="outlined"
                        style={{ width: "100%" }}
                        disabled={selectedCollege}
                        value={
                          selectedCollege
                            ? selectedCollege?.email
                            : collegeDetails?.email
                        }
                        onChange={handleChange}
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
                      {errors.email && (
                        <FormHelperText>{errors.email}</FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <TextField
                    id="outlined-basic"
                    name="website"
                    label="Website"
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
                    disabled={selectedCollege}
                    value={
                      selectedCollege
                        ? selectedCollege?.website
                        : collegeDetails?.website
                    }
                    onChange={handleChange}
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4>Course</h4>
                    {(createOrEdit === "create" || createOrEdit === "edit") && (
                      <div
                        style={{
                          backgroundColor: "#031C30",
                          display: "flex",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setOpenDialog(true);
                          setCourseDetail();
                        }}
                      >
                        <AddIcon style={{ color: "white" }} />
                      </div>
                    )}
                  </div>
                  {selectedCollege?.course_fees?.map((item) => (
                    <div
                      style={{
                        fontSize: "14px",
                        border: "1px solid lightgray",
                        padding: "10px",
                        borderRadius: "8px",
                        margin: "20px 0px",
                      }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {createOrEdit === "edit" && (
                          <CreateIcon
                            fontSize="small"
                            onClick={() => {
                              setOpenDialog(true);
                              setCourseDetail({
                                course_id: item?.course_id,
                                admission_fee: item?.admission_fee,
                                service_charge: item?.service_charge,
                                hostel_term_1: item?.tuition_term_1,
                                hostel_term_2: item?.tuition_term_2,
                                hostel_term_3: item?.tuition_term_3,
                                hostel_term_4: item?.tuition_term_4,
                                hostel_term_5: item?.tuition_term_5,
                                tuition_term_1: item?.tuition_term_1,
                                tuition_term_2: item?.tuition_term_2,
                                tuition_term_3: item?.tuition_term_3,
                                tuition_term_4: item?.tuition_term_4,
                                tuition_term_5: item?.tuition_term_5,
                              });
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            Course Name :
                          </span>
                          {
                            courseList?.find(
                              (course) => course?.id == item?.course_id
                            )?.name
                          }
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            Admission Fee :
                          </span>
                          {item?.admission_fee}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            Service Fee :
                          </span>
                          {item?.service_charge}
                        </div>
                        <div
                          style={{
                            marginTop: "5px",
                            backgroundColor: "#D3D3D3",
                            padding: "10px 20px",
                          }}
                        >
                          {Array(
                            Number(
                              courseList?.find(
                                (course) => course?.id == item?.course_id
                              )?.duration
                            )
                          )
                            .fill(null)
                            .map((_, index) => (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span style={{ fontWeight: "bold" }}>
                                  Tution Fee Term {index + 1}:
                                </span>
                                {item?.[`tuition_term_${index + 1}`]}
                              </div>
                            ))}
                        </div>
                        <div
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#D3D3D3",
                            padding: "10px 20px",
                          }}
                        >
                          {Array(
                            Number(
                              courseList?.find(
                                (course) => course?.id == item?.course_id
                              )?.duration
                            )
                          )
                            .fill(null)
                            .map((_, index) => (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span style={{ fontWeight: "bold" }}>
                                  Hostel Fee Term {index + 1}:
                                </span>
                                {item?.[`hostel_term_${index + 1}`]}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {openDialog && (
                    <SimpleDialogDemo
                      open={openDialog}
                      setOpen={setOpenDialog}
                      content={
                        <div>
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
                                name="course_id"
                                style={{
                                  width: "100%",
                                  height: "50px",
                                  borderRadius: "8px",
                                }}
                                value={courseDetail?.course_id}
                                onChange={handleCourseChange}
                              >
                                <option value="">Select Course</option>
                                {courseList.map((course) => (
                                  <option value={course?.id}>
                                    {course?.name}
                                  </option> // Course value must be updated
                                ))}
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
                              name="admission_fee"
                              label="Admission Fee"
                              variant="outlined"
                              style={{ width: "100%" }}
                              value={courseDetail?.admission_fee}
                              onChange={handleCourseChange}
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
                              name="service_charge"
                              label="Service Charge"
                              variant="outlined"
                              style={{ width: "100%" }}
                              value={courseDetail?.service_charge}
                              onChange={handleCourseChange}
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
                                flexWrap: "wrap",
                              }}
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
                                        style={{ width: "100%" }}
                                        slotProps={{
                                          inputLabel: { shrink: true },
                                        }}
                                        value={
                                          tutionFee
                                            ? tutionFee[
                                                `tuition_term_${index + 1}`
                                              ]
                                            : courseDetail?.[
                                                `tuition_term_${index + 1}`
                                              ]
                                        }
                                        onChange={handleFeeChange}
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
                                    ))
                                : ""}
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
                                flexWrap: "wrap",
                              }}
                            >
                              {Duration
                                ? Array(Duration)
                                    .fill(null)
                                    .map((_, index) => (
                                      <TextField
                                        key={index}
                                        id={`hostel_term_${index + 1}`}
                                        name={`hostel_term_${index + 1}`}
                                        label={`hostel_term_${index + 1}`}
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        slotProps={{
                                          inputLabel: { shrink: true },
                                        }}
                                        value={
                                          hostelFee
                                            ? hostelFee[
                                                `hostel_term_${index + 1}`
                                              ]
                                            : courseDetail?.[
                                                `hostel_term_${index + 1}`
                                              ]
                                        }
                                        onChange={handleHostelFeeChange}
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
                                    ))
                                : ""}
                            </div>
                          </div>
                          {createOrEdit != "detail" && (
                            <div
                              style={{
                                padding: "30px 20px",
                                display: "flex",
                                justifyContent: "end",
                                textTransform: "inherit",
                              }}
                            >
                              <Button
                                variant="outlined"
                                onClick={() => setOpenDialog(false)}
                                style={{
                                  textTransform: "inherit",
                                  cursor: "pointer",
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                style={{
                                  textTransform: "inherit",
                                  cursor: "pointer",
                                  marginLeft: "20px",
                                }}
                                onClick={() => handleCourseSubmit()}
                              >
                                {createOrEdit === "detail"
                                  ? "Update"
                                  : "Create"}
                              </Button>
                            </div>
                          )}
                        </div>
                      }
                    />
                  )}
                </div>
              </>
              {createOrEdit != "detail" && (
                <div
                  style={{
                    padding: "30px 20px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => setOpen(false)}
                    style={{ textTransform: "inherit", cursor: "pointer" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "inherit",
                      cursor: "pointer",
                      marginLeft: "20px",
                    }}
                    onClick={() => handleSubmit()}
                  >
                    {createOrEdit === "detail" ? "Update" : "Create"}
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

export default College;
