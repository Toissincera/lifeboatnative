import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { CaseService } from "../data/services/case.service";
import { MemberService } from "../data/services/member.service";
import { format } from "date-fns";

const CaseFlow = ({ caase, setCaase }) => {
  const location = useLocation();
  const caseId = location.pathname.split("/")[2];
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [assignee, setAssignee] = useState(null);
  const [targetAmount, setTargetAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [targetSet, setTargetSet] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [approved, setApproved] = useState(false);
  const [inActive, setInActive] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [updatedTime, setUpdatedTime] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState("");

  const steps = [
    { label: "Opened" },
    { label: "Approved/Rejected" },
    { label: "Target Amount Set" },
    { label: "Active/Inactive" },
    { label: "Closed" },
  ];

  useEffect(() => {
    if (!caase) return;

    const stepIndex = getStepIndex(caase.latest_status);
    setActiveStep(stepIndex);
    const hasTargetAmount = !!caase.target_amount;
    setTargetSet(hasTargetAmount);
    setTargetAmount(caase.target_amount || "");
    setRejected(caase.latest_status === "REJECTED");
    setApproved(caase.latest_status === "APPROVED");
    setInActive(caase.latest_status === "INACTIVE");
    setAssignee(caase.assignee || null);
    setUpdatedTime(caase.updated_at || null);
    setApprovalStatus(caase.latest_status === "REJECTED" ? "Rejected" : caase.latest_status === "APPROVED" ? "Approved" : "");

    updateCompletedSteps(hasTargetAmount && stepIndex < 2 ? 2 : stepIndex);

    MemberService.getAll()
      .then((data) => setMembers(data))
      .catch((error) => console.error("Failed to fetch members:", error));
  }, [caase]);

  const getStepIndex = (status) => {
    switch (status) {
      case "OPENED": return 0;
      case "APPROVED": return 1;
      case "REJECTED": return 1;
      case "SET_TARGET": return 2;
      case "ACTIVE": return 3;
      case "INACTIVE": return 3;
      case "CLOSED": return 4;
      default: return 0;
    }
  };

  const updateCompletedSteps = (currentStep) => {
    const newCompleted = {};
    for (let i = 0; i <= currentStep; i++) {
      newCompleted[i] = true;
    }
    setCompletedSteps(newCompleted);
  };

  const handleStatusUpdate = (status) => {
    setUpdateLoading(true);
    let updateData = { latest_status: status };

    if (status === "REJECTED" || status === "APPROVED") {
      updateData.current_status = "OPENED";
    } else if (status === "INACTIVE") {
      updateData.current_status = "ACTIVE";
    } else if (status === "ACTIVE" && inActive) {
      updateData.current_status = "INACTIVE";
    }

    CaseService.update(updateData, caseId)
      .then((updatedCase) => {
        const nextStep = getStepIndex(status);
        setActiveStep(nextStep);
        updateCompletedSteps(nextStep);

        setRejected(status === "REJECTED");
        setApproved(status === "APPROVED");
        setInActive(status === "INACTIVE");
        setUpdatedTime(updatedCase.updated_at || null);
        if (status === "REJECTED") setApprovalStatus("Rejected");
        if (status === "APPROVED") setApprovalStatus("Approved");

        setCaase((prevCaase) => ({
          ...prevCaase,
          latest_status: status,
          updated_at: updatedCase.updated_at || prevCaase.updated_at,
        }));
      })
      .catch((error) => console.error("Status update failed:", error))
      .finally(() => setUpdateLoading(false));
  };

  const handleSetTargetClick = () => {
    // Set targetAmount to caase.required_amount as a default value if available
    setTargetAmount(caase?.required_amount || "");
    setOpenDialog(true);
  };

  const handleDialogConfirm = () => {
    const amount = parseFloat(targetAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid target amount greater than zero.");
      return;
    }
    setOpenDialog(false);
    setUpdateLoading(true);

    const updateData = {
      target_amount: amount,
      latest_status: "SET_TARGET",
      current_status: "APPROVED",
    };

    if (selectedMember) {
      updateData.assignee = selectedMember;
    }

    CaseService.update(updateData, caseId)
      .then((response) => {
        const updatedCase = response.data; // Ensure correct API response structure

        console.log("Updated Case:", updatedCase);

        // Ensure updatedCase has the expected structure
        if (!updatedCase || !updatedCase.assignee) {
          console.warn("Assignee not updated in API response.");
          return;
        }

        // Extract the updated assignee details safely
        const updatedAssignee = {
          first_name: updatedCase.assignee.user?.first_name || "",
          last_name: updatedCase.assignee.user?.last_name || "",
        };

        console.log("Updated Assignee:", updatedAssignee);

        // Update state AFTER we have the correct updatedCase
        setCaase((prevCaase) => ({
          ...prevCaase,
          target_amount: amount,
          assignee: updatedCase.assignee, // Ensure this is updated properly
          latest_status: "SET_TARGET",
          updated_at: updatedCase.updated_at || prevCaase.updated_at,
        }));

        setAssignee(updatedAssignee); // Only update this if it exists
        setUpdatedTime(updatedCase.updated_at || null);

        setTargetAmount(amount);
        setTargetSet(true);
        setActiveStep(2);
        updateCompletedSteps(2);
        setSelectedMember("");
      })
      .catch((error) => console.error("Target amount update failed:", error))
      .finally(() => setUpdateLoading(false));
  };


  const stepLabels = steps.map((step, index) => {
    if (index === 1) {
      return { label: approvalStatus ? approvalStatus : "Approved/Rejected" };
    }
    if (index === 3) return { label: inActive ? "Inactive" : "Active" };
    return step;
  });

  return (
    <Paper elevation={2} sx={{ padding: 2, margin: "auto", width: isMobile ? "100%" : "900px" }}>
      <Typography variant="h6" gutterBottom>Case Flow</Typography>
      <Stepper activeStep={activeStep} orientation={isMobile ? "vertical" : "horizontal"} sx={{ width: "100%", my: 2 }}>
        {stepLabels.map((step, index) => (
          <Step key={step.label} completed={completedSteps[index]}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        {activeStep < steps.length - 1 && (
          <Grid container spacing={2} justifyContent="center" direction={isMobile ? "column" : "row"}>
            {activeStep === 0 && (
              <>
                <Button
                  variant="contained"
                  onClick={() => handleStatusUpdate("APPROVED")}
                  disabled={updateLoading || rejected || approved}
                  sx={{ marginRight: isMobile ? 0 : 1, marginBottom: isMobile ? 1 : 0 }}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleStatusUpdate("REJECTED")}
                  disabled={updateLoading || rejected || approved}
                  sx={{ marginLeft: isMobile ? 0 : 1 }}
                >
                  Reject
                </Button>
              </>
            )}
            {activeStep === 1 && !targetSet && !rejected && (
              <Button variant="contained" onClick={handleSetTargetClick} disabled={updateLoading} sx={{ marginTop: 1 }}>
                Set Target
              </Button>
            )}
            {activeStep === 2 && !rejected && (
              <Button
                variant="contained"
                onClick={() => handleStatusUpdate("ACTIVE")}
                disabled={updateLoading || activeStep === 3}
                sx={{ marginTop: 1 }}
              >
                Activate
              </Button>
            )}
            {activeStep === 3 && (
              <>
                <Button
                  variant="contained"
                  onClick={() => handleStatusUpdate(inActive ? "ACTIVE" : "INACTIVE")}
                  disabled={updateLoading}
                  sx={{ marginTop: 1, marginRight: isMobile ? 0 : 1, marginBottom: isMobile ? 1 : 0 }}
                >
                  {inActive ? "Activate" : "Inactivate"}
                </Button>
                {!inActive && (
                  <Button
                    variant="contained"
                    onClick={() => handleStatusUpdate("CLOSED")}
                    disabled={updateLoading}
                    sx={{ marginTop: 1 }}
                  >
                    Close
                  </Button>
                )}
              </>
            )}
          </Grid>
        )}
      </Box>

      <Box sx={{ textAlign: "center", marginTop: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {assignee && assignee.user && (
          <Chip label={`Assigned to: ${assignee.user.first_name} ${assignee.user.last_name}`} sx={{ marginBottom: 1 }} />
        )}
        {targetAmount && (
          <Typography variant="subtitle1" sx={{ marginTop: 1 }}>🎯 Target Amount: ₹{targetAmount}</Typography>
        )}
        {updatedTime && (
          <Typography variant="caption" sx={{ marginTop: 1, color: "text.secondary" }}>
            Last Updated: {format(new Date(updatedTime), "MMM dd, HH:mm")}
          </Typography>
        )}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth={isMobile}>
        <DialogTitle>Enter Target Amount</DialogTitle>
        <DialogContent>
          <TextField
            label="Target Amount"
            type="number"
            fullWidth
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder={caase?.required_amount ? `₹${caase.required_amount}` : "Enter amount"}
            sx={{ marginTop: 2 }}
          />
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="member-select-label">Assign To</InputLabel>
            <Select
              labelId="member-select-label"
              id="member-select"
              value={selectedMember}
              label="Assign To"
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {members.map((member) => (
                <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CaseFlow;