import { ArrowBackIosNew, CurrencyRupee } from "@mui/icons-material";
import { Box, Button, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { isoDateToDDMMYYYY } from "../utils/string.utils";

export const SubHeader = ({ actionList, caase, selected, setSelected }) => {
  if (!caase) {
    return (
      <Box p={4}>
        <Typography variant="h5" gutterBottom>No Case Found at this URL.</Typography>
        <Typography variant="body1">Either the URL had a typo, or this case was deleted / never created.</Typography>
      </Box>
    );
  }

  const progress = caase.target_amount
    ? Math.min(100, Math.floor((caase.total_amount_donated / caase.target_amount) * 100))
    : 0;

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        {/* Header */}
        <Grid item sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Link to="/cases" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <ArrowBackIosNew sx={{ color: "teal", fontSize: 20, mr: 1 }} />
          </Link>
          <Typography sx={{ fontSize: "calc(0.8vw + 16px)", fontWeight: 600 }}>
            {caase.name}
          </Typography>
        </Grid>

        {/* Case Details */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {[
              { label: "Assignee", value: `${caase.assignee?.user?.first_name || "Unassigned"} ${caase.assignee?.user?.last_name || ""}` },
              { label: "Amount Requested", value: `₹ ${caase.required_amount}` },
              { label: "Contact", value: caase.phone_number || "N/A" },
              { label: "Created At", value: isoDateToDDMMYYYY(caase.created_at) }
            ].map((item, idx) => (
              <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ fontSize: { xs: "13px", sm: "15px" }, fontWeight: "bold" }}>{item.label}:</Typography>
                <Typography sx={{ fontSize: { xs: "13px", sm: "15px" }, fontWeight: 500 }}>{item.value}</Typography>
              </Box>
            ))}
          </Grid>

          {/* Bank Details */}
          <Grid item xs={12} sm={6}>
            {[
              { label: "Recipient Name", value: caase.bank_account_name || "N/A" },
              { label: "Zakat Eligibility", value: caase.zakat_eligible ? "Yes" : "No" }
            ].map((item, idx) => (
              <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ fontSize: { xs: "13px", sm: "15px" }, fontWeight: "bold" }}>{item.label}:</Typography>
                <Typography sx={{ fontSize: { xs: "13px", sm: "15px" }, fontWeight: 500 }}>{item.value}</Typography>
              </Box>
            ))}
          </Grid>
        </Grid>

        {/* Collected + Target stacked above progress */}
        <Grid
          container
          sx={{
            mt: 2,
            mb: 1,
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}
        >
          {/* Collected */}
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <Typography sx={{ fontSize: { xs: "11px", sm: "14px" }, fontWeight: "bold" }}>
              Collected
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CurrencyRupee fontSize="small" sx={{ verticalAlign: "middle" }} />
              <Typography sx={{ fontSize: { xs: "14px", sm: "15px" }, fontWeight: "bold" }}>
                {caase.total_amount_donated}
              </Typography>
            </Box>
          </Grid>

          {/* Target */}
          <Grid item xs={6} sx={{ textAlign: "right" }}>
            <Typography sx={{ fontSize: { xs: "11px", sm: "14px" }, fontWeight: "bold" }}>
              Target
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <CurrencyRupee fontSize="small" sx={{ verticalAlign: "middle" }} />
              <Typography sx={{ fontSize: { xs: "14px", sm: "15px" }, fontWeight: "bold" }}>
                {caase.target_amount || `Not Set`}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Progress Bar */}
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs={12}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 20, borderRadius: 4, width: "100%" }}
            />
            <Typography sx={{ fontSize: { xs: "11px", sm: "13px" }, fontWeight: "bold", mt: 0.5, textAlign: "right" }}>
              {progress}% Funded
            </Typography>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box pt={2}>
          <Grid container spacing={1} justifyContent="flex-end">
            {actionList.map((item) => (
              <Grid item key={item.id} xs={6} sm="auto">
                <Button
                  variant={selected === item.id ? `contained` : `outlined`}
                  disabled={item.action === "Donate" && caase.latest_status !== "ACTIVE"}
                  size="small"
                  onClick={() => setSelected(item.id)}
                  fullWidth
                >
                  {item.action}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
