import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const enhancedCasesColumns = [
  { label: "Case Name", width: "25%" },
  { label: "Donation Progress", width: "30%" },
  { label: "Case Date", width: "25%" },
  { label: "Status", width: "20%" },
];

export function EnhancedCasesTable({ dataList = [] }) {
  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {enhancedCasesColumns.map((col, i) => (
              <TableCell
                key={i}
                sx={{
                  width: col.width,
                  fontWeight: 600,
                  fontSize: { xs: "0.8rem", sm: "1rem", lg: "1rem" },
                  whiteSpace: "nowrap",
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((row, idx) => (
            <TableRow
              key={idx}
              hover
              component={Link}
              to={`/cases/${row.case_uid}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    fontWeight: 500,
                  }}
                >
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.9rem", lg: "1rem" },
                    fontWeight: 500,
                  }}
                >
                  {row.target_amount > 0
                    ? `₹${row.total_amount_donated} / ₹${row.target_amount}`
                    : "Inactive"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.9rem" },
                    fontWeight: 500,
                  }}
                >
                  {row.case_date}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.9rem" },
                    fontWeight: 500,
                  }}
                >
                  {row.latest_status}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}