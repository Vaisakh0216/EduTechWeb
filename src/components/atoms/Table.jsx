import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

// export default function BasicTable({ columns, rows, onClickFunction }) {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell style={{ fontWeight: "bold" }}>S/N</TableCell>
//             {columns.map((col, index) => (
//               <TableCell
//                 key={index}
//                 align="left"
//                 style={{ fontWeight: "bold" }}
//               >
//                 {col}
//               </TableCell>
//             ))}
//             <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, rowIndex) => (
//             <TableRow
//               key={rowIndex}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               onClick={() => onClickFunction(row)}
//             >
//               <TableCell key={rowIndex} component="td" align="left">
//                 {rowIndex + 1}
//               </TableCell>
//               {Object.keys(row).map((key, cellIndex) => (
//                 <TableCell key={cellIndex} component="td" align="left">
//                   {row[key]}
//                 </TableCell>
//               ))}
//               <TableCell key={rowIndex} component="td" align="left">
//                 <DeleteIcon />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

export default function BasicTable({ columns, rows, onClickFunction }) {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "white" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ borderBottom: "1px solid gray" }}>
          <TableRow>
            {/* <TableCell style={{ fontWeight: "bold" }} align="center">
              S/N
            </TableCell> */}
            {columns?.map((col, index) => (
              <TableCell
                key={index}
                align="center"
                style={{ fontWeight: "bold", color: "#898989" }}
              >
                {col}
              </TableCell>
            ))}
            <TableCell
              style={{ fontWeight: "bold", color: "#898989" }}
              align="center"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, rowIndex) => (
            // Use a unique key for each row, assuming row.id is unique
            <TableRow
              key={row.id || rowIndex}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: rowIndex % 2 ? "#fafafa" : "#f0f0f0",
                textTransform: "capitalize",
              }}
              onClick={() => onClickFunction(row, rowIndex)}
            >
              {Object.keys(row).map((key, cellIndex) => (
                // Ensure a unique key by combining row.id with cellIndex
                <TableCell
                  key={`${row.id || rowIndex}-${cellIndex}`}
                  component="td"
                  align="center"
                >
                  {row[key]}
                </TableCell>
              ))}
              <TableCell component="td" align="center">
                <DeleteIcon sx={{ color: "#898989", cursor: "pointer" }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
