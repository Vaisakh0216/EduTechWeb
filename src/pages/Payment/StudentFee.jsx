import React, { useState } from "react";
import BasicTable from "../../components/atoms/Table";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import Drawer from "../../components/atoms/Drawer";

function StudentFee() {
  const [open, setOpen] = useState(false);
  const [admissionNo, setAdmissionNo] = useState("");
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

  const getDetail = (val) => {
    console.log("this is val", val);
    setOpen(true);
    setAdmissionNo(val);
  };

  return (
    <div>
      <BasicTable columns={columns} rows={rows} onClickFunction={getDetail} />
      {open && (
        <Drawer
          width="50%"
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
                <h3>Student Fee Tracking</h3>
                <ClearIcon onClick={() => setOpen(false)} />
              </div>
              <div style={{ padding: "15px" }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "14px", fontWeight: 400 }}>
                    {admissionNo}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      gap: "5px",
                    }}
                  >
                    <h3 style={{ fontSize: "14px" }}>From Student:</h3>
                    <h3 style={{ fontSize: "14px", fontWeight: "normal" }}>
                      10000
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      gap: "5px",
                    }}
                  >
                    <h3 style={{ fontSize: "14px" }}>To College:</h3>
                    <h3 style={{ fontSize: "14px", fontWeight: "normal" }}>
                      10000
                    </h3>
                  </div>
                </div>
                <div>
                  <h3>Paid By - Vaisakh V</h3>
                  <div></div>
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

export default StudentFee;
