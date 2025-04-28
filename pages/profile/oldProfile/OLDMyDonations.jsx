import * as React from "react";
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
import HourglassTop from "@mui/icons-material/HourglassTop";
import { Link } from "react-router-dom";
import { dateTimeShow } from "./OLDProfile";
import { isoDateToFullFormat } from "../../utils/string.utils";

export default function MyDonations({ donos }) {
  if (!donos) return <Skeleton type="circle" />;

  if (donos.length === 0 || donos.every((caase) => caase.donations.length === 0)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80px', padding: '16px' }}>
        <Typography variant="body1">No donations</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} id="WTF" sx={{ overflow: "auto" }}>
      <Table sx={{ overflow: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headerCell.name}>Case Name</TableCell>
            <TableCell sx={headerCell.rfid}>
              Transaction ID
            </TableCell>
            <TableCell sx={headerCell.dona}>
              <CurrencyRupee fontSize="small" sx={{ verticalAlign: "middle" }} />
              Donated
            </TableCell>
            <TableCell sx={headerCell.date}>Donated At</TableCell>
            <TableCell sx={headerCell.veri}>Verified At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donos.map((caase, ix) =>
            caase.donations.map((oneDono, i) => (
              <TableRow
                key={`${ix}-${i}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={bodyCell.name}>
                  <Link to={`/cases/${oneDono.case_uid}`} className="link">
                    {caase.case_name}
                  </Link>
                </TableCell>
                <TableCell sx={bodyCell.rfid}>{oneDono.donation_reference_id}</TableCell>
                <TableCell sx={bodyCell.dona}>{oneDono.amount}</TableCell>
                <TableCell sx={bodyCell.date}>{isoDateToFullFormat(oneDono.donated_at, true)}</TableCell>
                <TableCell sx={bodyCell.veri}>
                  {oneDono.is_verified ? dateTimeShow(oneDono.verified_at) : <HourglassTop />}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const baseCellStyle = { padding: 1.5, fontSize: "0.8rem" };

const headerCell = {
  rfid: { ...baseCellStyle, minWidth: "50px", fontWeight: "bold" },
  name: { ...baseCellStyle, minWidth: "150px", fontWeight: "bold" },
  dona: { ...baseCellStyle, minWidth: "50px", fontWeight: "bold" },
  date: { ...baseCellStyle, minWidth: "120px", fontWeight: "bold" },
  veri: { ...baseCellStyle, minWidth: "100px", fontWeight: "bold" },
};

const bodyCell = {
  rfid: { ...baseCellStyle, minWidth: "50px" },
  name: { ...baseCellStyle, minWidth: "150px" },
  dona: { ...baseCellStyle, minWidth: "50px" },
  date: { ...baseCellStyle, minWidth: "125px" },
  veri: { ...baseCellStyle, minWidth: "125px" },
};