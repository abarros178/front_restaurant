import React from 'react';
import { Stepper, Step, StepLabel, Typography, Box } from '@mui/material';

const OrderStepper = ({ activeStep, steps }) => (
  <Box sx={{ my: 4 }}>
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', color: 'text.secondary', mt: 2 }}>
      {steps[activeStep].description}
    </Typography>
  </Box>
);

export default OrderStepper;