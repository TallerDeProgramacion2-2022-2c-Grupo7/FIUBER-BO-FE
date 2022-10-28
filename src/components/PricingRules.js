import React, { useState, useEffect } from 'react';
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
import Container from './common/Container';
import { RequireAuth, useAuth } from '../contexts/Auth';
import { getPricing, getPricingRule, updatePricingRules } from '../api/pricing';

function RuleReview() {
  return (
    <>
      <Grid container justifyContent="center" sx={{ mb: '3rem' }}>
        <Typography variant="p" gutterBottom>
          <InfoIcon sx={{ mb: '-0.3rem', mr: '0.3rem' }} />
          Create a sample trip to test the rule.
        </Typography>
      </Grid>
      <Grid container spacing={3} sx={{ mb: '3rem' }}>
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
            id="testTripFrom"
            label="Trip's origin (latitude,longitude)"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="testTripTo"
            label="Trip's destination (latitude,longitude)"
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
            id="testPaymentMethod"
            label="Payment method"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  );
}

function PricingDiscountsForm({ rule }) {
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
            value={rule.discounts?.zone}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="zoneDiscountCenter"
            label="Center (latitude,longitude)"
            fullWidth
            variant="standard"
            // eslint-disable-next-line max-len
            value={rule.parameters ? `${rule.parameters?.zoneCenter.latitude},${rule.parameters?.zoneCenter.longitude}` : ''}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="zoneDiscountRadius"
            label="Radius (meters)"
            fullWidth
            variant="standard"
            value={rule.parameters?.zoneRadius}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="timeDiscountValue"
            label="Time discount (%)"
            fullWidth
            variant="standard"
            value={rule.discounts?.time}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="timeDiscountDays"
            label="Days"
            fullWidth
            variant="standard"
            value={rule.parameters?.timeDays.join(',')}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="timeDiscountTimeRange"
            label="Time range"
            fullWidth
            variant="standard"
            value={rule.parameters?.timeHours.join('-')}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="debitCardDiscount"
            label="Debit card's discount (%)"
            fullWidth
            variant="standard"
            value={rule.discounts?.paymentDebit}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="creditCardDiscount"
            label="Credit card's discount (%)"
            fullWidth
            variant="standard"
            value={rule.discounts?.paymentCredit}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  );
}

function PricingWeightsForm({ rule }) {
  return (
    <>
      <Grid container justifyContent="center" sx={{ mb: '3rem' }}>
        <Typography variant="p" gutterBottom>
          <InfoIcon sx={{ mb: '-0.3rem', mr: '0.3rem' }} />
          Set the rule&apos;s pricing weights (from -100 to 100).
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
            value={rule.weights?.driverTripsOfDay}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="driverTripsOfMonth"
            label="Driver's trips of the month"
            fullWidth
            variant="standard"
            value={rule.weights?.driverTripsOfMonth}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="driverActiveDays"
            label="Driver's active days"
            fullWidth
            variant="standard"
            value={rule.weights?.driverActiveDays}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="driverPickupDelay"
            label="Driver's pickup delay"
            fullWidth
            variant="standard"
            value={rule.weights?.driverPickupDelay}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="passengerTripsOfDay"
            label="Passenger's trips of the day"
            fullWidth
            variant="standard"
            value={rule.weights?.passengerTripsOfDay}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="passengerTripsOfMonth"
            label="Passenger's trips of the month"
            fullWidth
            variant="standard"
            value={rule.weights?.passengerTripsOfMonth}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="passengerActiveDays"
            label="Passenger's active days"
            fullWidth
            variant="standard"
            value={rule.weights?.passengerActiveDays}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tripDuration"
            label="Trip's duration"
            fullWidth
            variant="standard"
            value={rule.weights?.tripDuration}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tripLength"
            label="Trip's length"
            fullWidth
            variant="standard"
            value={rule.weights?.tripLength}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tripsInLastTimeWindow"
            label="Number of trips in last time window"
            fullWidth
            variant="standard"
            value={rule.weights?.tripsInLastTimeWindow}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="timeWindowSize"
            label="Time window size (minutes)"
            fullWidth
            variant="standard"
            value={rule.parameters?.timeWindowSize}
            onChange={() => {}}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  );
}

const steps = ['Pricing weights', 'Pricing discounts', 'Rule review'];

function getStepContent(step, rule) {
  switch (step) {
    case 0:
      return <PricingWeightsForm rule={rule} />;
    case 1:
      return <PricingDiscountsForm rule={rule} />;
    case 2:
      return <RuleReview rule={rule} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function PricingRule() {
  const [activeStep, setActiveStep] = useState(0);
  const [rule, setRule] = useState({});
  const [testPrice, setTestPrice] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    document.title = 'Pricing rules - FIUBER Backoffice';
    const loadRule = async () => {
      const pricingRule = await getPricingRule(auth.user);
      setRule(pricingRule);
    };

    loadRule();
  }, []);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await updatePricingRules(auth.user, rule);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleTestRules = async () => {
    const getValue = (id) => document.getElementById(id).value;
    const testTrip = {
      from: {
        latitude: window.parseFloat(getValue('testTripFrom').split(',')[0]),
        longitude: window.parseFloat(getValue('testTripFrom').split(',')[1]),
      },
      to: {
        latitude: window.parseFloat(getValue('testTripTo').split(',')[0]),
        longitude: window.parseFloat(getValue('testTripTo').split(',')[1]),
      },
    };
    const price = await getPricing(auth.user, rule, testTrip);
    setTestPrice(price);
  };

  return (
    <RequireAuth>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Update pricing rules
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
              Rules updated successfully.
            </Typography>
          ) : (
            <>
              {getStepContent(activeStep, rule)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep === steps.length - 1 && (
                  <>
                    <Typography>
                      Final price: $
                      { testPrice || '-' }
                    </Typography>
                    <Button variant="outlined" onClick={handleTestRules} sx={{ mt: 3, ml: 1 }}>
                      Test rules
                    </Button>
                  </>
                )}
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
                  {activeStep === steps.length - 1 ? 'Update rules' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </RequireAuth>
  );
}
