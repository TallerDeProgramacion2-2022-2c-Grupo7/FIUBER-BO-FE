import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from './common/Container';

function RuleReview() {
  return (
    <>
      <Grid container justifyContent="center" sx={{ mb: '3rem' }}>
        <Typography variant="p" gutterBottom>
          <InfoIcon sx={{ mb: '-0.3rem', mr: '0.3rem' }} />
          Create a sample trip to test the rule.
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="testDriverTripsOfDay"
            label="Driver's trips of the day"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="testDriverTripsOfMonth"
            label="Driver's trips of the month"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="testDriverActiveDays"
            label="Driver's active days"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="testDriverPickupDelay"
            label="Driver's pickup delay"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testPassengerTripsOfDay"
            label="Passenger's trips of the day"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testPassengerTripsOfMonth"
            label="Passenger's trips of the month"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testPassengerActiveDays"
            label="Passenger's active days"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testTripDuration"
            label="Trip's duration"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testTripLength"
            label="Trip's length"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testTripsInLastTimeWindow"
            label="Number of trips in last time window"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testTripStartingPoint"
            label="Trip's starting point"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testTripStartDatetime"
            label="Trip's start datetime"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testPaymentMethod"
            label="Payment method"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: '3rem' }}>
        <Typography variant="h6" gutterBottom>
          Final price:
          <strong style={{ marginLeft: '1rem' }}>$10</strong>
        </Typography>
      </Grid>
    </>
  );
}

function PricingDiscountsForm() {
  return (
    <>
      <Grid container justifyContent="center" sx={{ mb: '3rem' }}>
        <Typography variant="p" gutterBottom>
          <InfoIcon sx={{ mb: '-0.3rem', mr: '0.3rem' }} />
          Set the rule&apos;s pricing discounts.
          If more than one discount applies, only the biggest will be used.
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="zoneDiscountValue"
            label="Zone discount (%)"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="zoneDiscountCenter"
            label="Center"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="zoneDiscountRadius"
            label="Radius"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="timeDiscountValue"
            label="Time discount (%)"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="timeDiscountDays"
            label="Days"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="timeDiscountTimeRange"
            label="Time range"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="debitCardDiscount"
            label="Debit card's discount (%)"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="creditCardDiscount"
            label="Credit card's discount (%)"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  );
}

function PricingWeightsForm() {
  return (
    <>
      <Grid container justifyContent="center" sx={{ mb: '3rem' }}>
        <Typography variant="p" gutterBottom>
          <InfoIcon sx={{ mb: '-0.3rem', mr: '0.3rem' }} />
          Set the rule&apos;s pricing weights.
          The price is increased by positive weights and decreased by negative weights.
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="driverTripsOfDay"
            label="Driver's trips of the day"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="driverTripsOfMonth"
            label="Driver's trips of the month"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="driverActiveDays"
            label="Driver's active days"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="driverPickupDelay"
            label="Driver's pickup delay"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="passengerTripsOfDay"
            label="Passenger's trips of the day"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="passengerTripsOfMonth"
            label="Passenger's trips of the month"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="passengerActiveDays"
            label="Passenger's active days"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tripDuration"
            label="Trip's duration"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tripLength"
            label="Trip's length"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tripsInLastTimeWindow"
            label="Number of trips in last time window"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="timeWindowSize"
            label="Time window size"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  );
}

const steps = ['Pricing weights', 'Pricing discounts', 'Rule review'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PricingWeightsForm />;
    case 1:
      return <PricingDiscountsForm />;
    case 2:
      return <RuleReview />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create pricing rule
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Typography variant="h5" gutterBottom>
              Rule created successfully.
            </Typography>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Create rule' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
