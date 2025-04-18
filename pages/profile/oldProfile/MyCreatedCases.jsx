import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import Skeleton from "../../components/skeleton/Skeleton";
import { Link } from "react-router-dom";
import { dateTimeShow } from "./Profile";

export default function MyCreatedCases({ cases }) {
  if (!cases) return <Skeleton type="circle" />;

  if (cases.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80px', padding: '16px' }}>
        <Typography variant="body1">No created cases</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} id="WTF" sx={{ overflow: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={headerCell.name}>Case Name</TableCell>
            <TableCell sx={headerCell.assi}>Assignee</TableCell>
            <TableCell sx={headerCell.targ}>
              <CurrencyRupee fontSize="small" sx={{ verticalAlign: "middle" }} />
              Target
            </TableCell>
            <TableCell sx={headerCell.stat}>Status</TableCell>
            <TableCell sx={headerCell.upda}>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cases.map((caase, ix) => (
            <TableRow
              key={ix}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={bodyCell.name}>
                <Link to={`/cases/${caase.case_uid}`} className="link">
                  {caase.name}
                </Link>
              </TableCell>
              <TableCell sx={bodyCell.assi}>{caase.assignee?.user?.first_name}{" "}{caase.assignee?.user?.last_name}</TableCell>
              <TableCell sx={bodyCell.targ}>{caase.target_amount ? caase.target_amount : "NOT SET"}</TableCell>
              <TableCell sx={bodyCell.stat}>{caase.latest_status}</TableCell>
              <TableCell sx={bodyCell.upda}>
                {dateTimeShow(caase.updated_at)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const baseCell = { padding: 1.5, fontSize: "0.8rem" };

const headerCell = {
  name: { ...baseCell, minWidth: "120px", fontWeight: "bold" },
  assi: { ...baseCell, minWidth: "80px", fontWeight: "bold" },
  targ: { ...baseCell, minWidth: "100px", fontWeight: "bold" },
  stat: { ...baseCell, minWidth: "80px", fontWeight: "bold" },
  upda: { ...baseCell, minWidth: "120px", fontWeight: "bold" },
};

const bodyCell = {
  name: { ...baseCell, minWidth: "120px" },
  assi: { ...baseCell, minWidth: "80px" },
  targ: { ...baseCell, minWidth: "75px" },
  stat: { ...baseCell, minWidth: "80px" },
  upda: { ...baseCell, minWidth: "125px" },
};