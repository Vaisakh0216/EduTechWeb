import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicTable from "../../components/atoms/Table";

function AgentFee() {
  const columns = [
    "Admission Number",
    "Agent Name",
    "Service Charge",
    "Admission Date",
    "Action",
  ];
  const rows = [
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Karan",
      serviceCharge: "100000",
      admissionDate: "16/11/2022",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Nikhil",
      serviceCharge: "100000",
      admissionDate: "16/11/2022",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Vaisakh",
      serviceCharge: "100000",
      admissionDate: "16/11/2022",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Diya",
      serviceCharge: "100000",
      admissionDate: "16/11/2022",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Vishnu",
      serviceCharge: "100000",
      admissionDate: "16/11/2022",
      actions: <DeleteIcon />,
    },
    {
      sn: "1",
      aNumber: "XYZ-2025-0001230000000000",
      Name: "Sam",
      serviceCharge: "100000",
      admissionDate: "16/11/2022",
      actions: <DeleteIcon />,
    },
  ];
  return (
    <div>
      <BasicTable columns={columns} rows={rows} />
    </div>
  );
}

export default AgentFee;
