import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "usm", label: "US Men's	", minWidth: 170 },
  { id: "uswm", label: "US Women's", minWidth: 100 },
  { id: "uk", label: "UK", minWidth: 100 },
  { id: "eu", label: "EU", minWidth: 100 },
];

function createData(usm, uswm, uk, eu) {
  return { usm, uswm, uk, eu };
}

const rows = [
  createData(3.5, 5, 3, 22.5, 35.5),
  createData(4, 5.5, 3, 22.5, 35.5),
  createData(4.5, 6, 3, 22.5, 35.5),
  createData(5, 5, 3, 22.5, 35.5),
  createData(5.5, 5, 3, 22.5, 35.5),
  createData(6, 5, 3, 22.5, 35.5),
  createData(6.5, 5, 3, 22.5, 35.5),
  createData(7, 5, 3, 22.5, 35.5),
  createData(7.5, 5, 3, 22.5, 35.5),
  createData(8, 5, 3, 22.5, 35.5),
  createData(8.5, 5, 3, 22.5, 35.5),
  createData(9, 5, 3, 22.5, 35.5),
  createData(9.5, 5, 3, 22.5, 35.5),
  createData(10, 5, 3, 22.5, 35.5),
  createData(10.5, 5, 3, 22.5, 35.5),
  createData(11, 5, 3, 22.5, 35.5),
  createData(11.5, 5, 3, 22.5, 35.5),
  createData(12, 5, 3, 22.5, 35.5),
  createData(12.5, 5, 3, 22.5, 35.5),
  createData(13, 5, 3, 22.5, 35.5),
  createData(13.5, 5, 3, 22.5, 35.5),
  createData(14, 5, 3, 22.5, 35.5),
  createData(14.5, 5, 3, 22.5, 35.5),
  createData(15, 5, 3, 22.5, 35.5),
  createData(15.5, 5, 3, 22.5, 35.5),
  createData(16, 5, 3, 22.5, 35.5),
  createData(16.5, 5, 3, 22.5, 35.5),
  createData(17, 5, 3, 22.5, 35.5),
  createData(17.5, 5, 3, 22.5, 35.5),
  createData(18, 5, 3, 22.5, 35.5),
  createData(18.5, 5, 3, 22.5, 35.5),
  createData(19, 5, 3, 22.5, 35.5),
  createData(19.5, 5, 3, 22.5, 35.5),
  createData(20, 5, 3, 22.5, 35.5),
  createData(20.5, 5, 3, 22.5, 35.5),
  createData(21, 5, 3, 22.5, 35.5),
  createData(21.5, 5, 3, 22.5, 35.5),
  createData(22, 5, 3, 22.5, 35.5),
];

export default function TableSizeComponent() {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={5}>
                <h1>Size Chart</h1>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
