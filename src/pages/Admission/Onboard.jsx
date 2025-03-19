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

function Onboard() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [state, setState] = useState({
    agent: false,
    main: false,
    sub: false,
    college: false,
    combainedFee: false,
  });
  const [admission, setAdmission] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("students");
        console.log(res.data);
        setAdmission(
          res?.data?.map((item) => ({
            aNumber: item?.id,
            Name: item?.first_name,
            CollegeName: item?.institute_id,
            admissionDate: item?.created_at,
            course: item?.course_id,
            actions: <DeleteIcon />,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

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
        <BasicTable columns={columns} rows={admission} />
      </div>
      {open && (
        <Drawer
          width="60%"
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
                  borderBottom: "1px solid gray",
                }}
              >
                <h3>Create Admission</h3>
                <ClearIcon onClick={() => setOpen(false)} />
              </div>
              <div
                style={{
                  padding: "15px",
                  marginTop: "20px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <label style={{ fontWeight: "bold", width: "160px" }}>
                    Select Academic Year:
                  </label>
                  <select
                    id="my-select"
                    style={{
                      height: "40px",
                    }}
                  >
                    <option value="option1">2024-2025</option>
                    <option value="option2">2025-2026</option>
                    <option value="option3">2026-2027</option>
                    <option value="option3">2027-2028</option>
                  </select>
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <label
                    style={{
                      fontWeight: "bold",
                      width: "160px",
                    }}
                  >
                    Admission Date:
                  </label>
                  <DatePicker
                    className="admissionDate"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="DD-MM-YYYY"
                  />
                </div>
                <div
                  style={{
                    marginTop: "50px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Name"
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
                  <DatePicker
                    className="dob-datepicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="DOB"
                  />
                  <select
                    id="my-select"
                    style={{
                      width: "100%",
                      height: "45px",
                      borderRadius: "8px",
                    }}
                  >
                    <option value="">Select Religion</option>
                    <option value="option1">Humanity</option>
                    <option value="option2">Christian</option>
                    <option value="option3">Hinduism</option>
                    <option value="option3">Islam</option>
                  </select>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <select
                    id="my-select"
                    style={{
                      width: "100%",
                      height: "45px",
                      borderRadius: "8px",
                    }}
                  >
                    <option value="">Select +2 Stream</option>
                    <option value="option1">Science</option>
                    <option value="option2">Commerce</option>
                    <option value="option3">Arts</option>
                    <option value="option3">Economics</option>
                  </select>
                  <TextField
                    id="outlined-basic"
                    label="Address"
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
                  <select
                    id="my-select"
                    style={{
                      width: "100%",
                      height: "45px",
                      borderRadius: "8px",
                    }}
                  >
                    <option value="">Select College</option>
                    <option value="option1">
                      Christ College of Science and Management
                    </option>
                    <option value="option2">Garden City University</option>
                  </select>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <select
                    id="my-select"
                    style={{
                      height: "45px",
                      borderRadius: "8px",
                      width: "100%",
                    }}
                  >
                    <option value="">Select Course</option>
                    <option value="option1">Bachelor of Arts</option>
                    <option value="option2">Bachelor of Commerce</option>
                    <option value="option2">
                      Bachelor of Business Administration
                    </option>
                  </select>
                  <TextField
                    id="outlined-basic"
                    label="Address"
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
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      name="agent"
                      checked={state?.agent}
                      onChange={handleCheckboxChange}
                    />
                    <span style={{ fontSize: "14px" }}>Agent</span>
                  </div>
                </div>
                {state?.agent && (
                  <div style={{ marginTop: "40px" }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                      >
                        <Checkbox
                          name="main"
                          checked={state?.main}
                          onChange={handleCheckboxChange}
                        />
                        <span>Main Agent</span>
                      </div>
                      {state?.main && (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            padding: "10px",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Agent Name"
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
                          <TextField
                            id="outlined-basic"
                            label="Contact Number"
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
                          <TextField
                            id="outlined-basic"
                            label="Amount"
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
                      )}
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                          fontSize: "14px",
                        }}
                      >
                        <Checkbox
                          name="sub"
                          checked={state?.sub}
                          onChange={handleCheckboxChange}
                        />
                        <span>Sub Agent</span>
                      </div>
                      {state?.sub && (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            padding: "10px",
                          }}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Agent Name"
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
                          <TextField
                            id="outlined-basic"
                            label="Contact Number"
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
                          <TextField
                            id="outlined-basic"
                            label="Amount"
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
                      )}
                      <div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            fontSize: "14px",
                          }}
                        >
                          <Checkbox
                            name="college"
                            checked={state?.college}
                            onChange={handleCheckboxChange}
                          />
                          <span>College Agent</span>
                        </div>
                        {state?.college && (
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              padding: "10px",
                            }}
                          >
                            <TextField
                              id="outlined-basic"
                              label="Agent Name"
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
                            <TextField
                              id="outlined-basic"
                              label="Contact Number"
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
                            <TextField
                              id="outlined-basic"
                              label="Amount"
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
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                    Contact Numbers
                  </h3>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <TextField
                      id="outlined-basic"
                      label="Student"
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
                    <TextField
                      id="outlined-basic"
                      label="Mother"
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
                    <TextField
                      id="outlined-basic"
                      label="Father"
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
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                    Fees Structure
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      fontSize: "14px",
                    }}
                  >
                    <Checkbox
                      name="combainedFee"
                      checked={state?.combainedFee}
                      onChange={handleCheckboxChange}
                    />
                    <span>Tution / Hostel fee combained</span>
                  </div>
                  {state?.combainedFee ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <TextField
                        id="outlined-basic"
                        label="1st Year"
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
                      <TextField
                        id="outlined-basic"
                        label="2nd Year"
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
                      <TextField
                        id="outlined-basic"
                        label="3rd Year"
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
                  ) : (
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                        Tution Fee
                      </h3>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <TextField
                          id="outlined-basic"
                          label="1st Year"
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
                        <TextField
                          id="outlined-basic"
                          label="2nd Year"
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
                        <TextField
                          id="outlined-basic"
                          label="3rd Year"
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
                      <h3 style={{ fontSize: "16px", fontWeight: "bolder" }}>
                        Hostel Fee
                      </h3>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <TextField
                          id="outlined-basic"
                          label="1st Year"
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
                        <TextField
                          id="outlined-basic"
                          label="2nd Year"
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
                        <TextField
                          id="outlined-basic"
                          label="3rd Year"
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
                  )}
                </div>
                <div
                  style={{
                    marginTop: "40px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>
                    Total fees to be paid:
                  </span>
                </div>
              </div>
              <div
                style={{
                  padding: "50px 20px",
                  display: "flex",
                  justifyContent: "end",
                  bottom: 0,
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
