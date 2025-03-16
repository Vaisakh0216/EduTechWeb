import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ columns, rows, onClickFunction }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>S/N</TableCell>
            {columns.map((col, index) => (
              <TableCell
                key={index}
                align="left"
                style={{ fontWeight: "bold" }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.keys(row).map((key, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  component="td"
                  align="left"
                  onClick={() => onClickFunction(row[key])}
                >
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
