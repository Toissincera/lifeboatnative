import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography, CircularProgress } from '@mui/material'; // Import CircularProgress

const stepsLanding = [
  'Sign Up',
  'Fill out details',
  'Await verification',
  'Login'
];

export default function StepperLanding({ active = 1 }) {
  return (
    <Box sx={{ width: '100%', marginBottom: "1rem" }}>
      <Stepper activeStep={active} alternativeLabel>
        {stepsLanding.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export function StepperCaseHistory({ caseHistoryArray }) {
  if (!caseHistoryArray) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const correctedTimeline = caseHistoryArray.toReversed();

  return (
    <Box sx={{ width: '100%', py: 4, my: 0, overflowX: "auto" }}>
      <Stepper activeStep={correctedTimeline.length} alternativeLabel>
        {correctedTimeline.map((item) => (
          <Step key={item.id}>
            <StepLabel>
              {item.status}
              <Typography sx={stepStyle.name}>{item.assignee}</Typography>
              <Typography sx={stepStyle.date}>{item.createdAt.slice(0, -8)}</Typography>
              <Typography sx={stepStyle.time}>{item.createdAt.slice(-8)}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

const stepStyle = {
  date: {
    fontSize: { xs: "10px", sm: "10px", md: "11px" },
    fontStyle: "italic",
    fontWeight: "350",
    fontFamily: "Roboto, sans-serif",
  },
  time: {
    fontSize: { xs: "10px", sm: "10px", md: "11px" },
    fontStyle: "italic",
    fontWeight: "350",
    fontFamily: "Roboto, sans-serif",
  },
  name: {
    fontSize: { xs: "12px", sm: "14px", md: "15px" },
    fontStyle: "italic",
    fontWeight: "400",
    fontFamily: "Roboto, sans-serif",
  },
};