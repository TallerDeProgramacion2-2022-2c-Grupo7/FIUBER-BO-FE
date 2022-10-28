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

const steps = ['Pricing weights', 'Pricing discounts', 'Rule review'];

// eslint-disable-next-line no-unused-vars
function PricingWeightsForm({ rule, setRule }) {
  const updateRulesWeights = (e) => {
    const updatedRule = { ...rule };
    // eslint-disable-next-line no-prototype-builtins
    if (updatedRule.weights.hasOwnProperty(e.target.id)) {
      updatedRule.weights[e.target.id] = e.target.value;
    } else {
      updatedRule.parameters[e.target.id] = e.target.value;
    }
    setRule(updatedRule);
  };
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
            defaultValue={rule.weights?.driverTripsOfDay}
            value={rule.weights?.driverTripsOfDay}
            onChange={updateRulesWeights}
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
            defaultValue={rule.weights?.driverTripsOfMonth}
            onChange={updateRulesWeights}
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
            defaultValue={rule.weights?.driverActiveDays}
            onChange={updateRulesWeights}
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
            defaultValue={rule.weights?.driverPickupDelay}
            onChange={updateRulesWeights}
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
            defaultValue={rule.weights?.passengerTripsOfDay}
            onChange={updateRulesWeights}
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
            defaultValue={rule.weights?.passengerTripsOfMonth}
            onChange={updateRulesWeights}
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
            defaultValue={rule.weights?.passengerActiveDays}
            onChange={updateRulesWeights}
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
            defaultValue={rule.weights?.tripDuration}
            onChange={updateRulesWeights}
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
            defaultValue={rule.weights?.tripLength}
            onChange={updateRulesWeights}
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
            defaultValue={rule.weights?.tripsInLastTimeWindow}
            onChange={updateRulesWeights}
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
            defaultValue={rule.parameters?.timeWindowSize}
            onChange={updateRulesWeights}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  );
}

function PricingDiscountsForm({ rule, setRule }) {
  const updateRulesDiscounts = (e) => {
    const updatedRule = { ...rule };
    // eslint-disable-next-line no-prototype-builtins
    if (updatedRule.discounts.hasOwnProperty(e.target.id)) {
      updatedRule.discounts[e.target.id] = e.target.value;
    } else if (e.target.id === 'zoneCenter') {
      const [latitude, longitude] = e.target.value.split(',');
      updatedRule.parameters.zoneCenter.latitude = latitude;
      updatedRule.parameters.zoneCenter.longitude = longitude;
    } else {
      updatedRule.parameters[e.target.id] = e.target.value;
    }
    setRule(updatedRule);
  };
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
            id="zone"
            label="Zone discount (%)"
            fullWidth
            variant="standard"
            value={rule.discounts?.zone}
            defaultValue={rule.discounts?.zone}
            onChange={updateRulesDiscounts}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="zoneCenter"
            label="Center (latitude,longitude)"
            fullWidth
            variant="standard"
            // eslint-disable-next-line max-len
            value={rule.parameters ? `${rule.parameters?.zoneCenter.latitude},${rule.parameters?.zoneCenter.longitude}` : ''}
            defaultValue={rule.parameters ? `${rule.parameters?.zoneCenter.latitude},${rule.parameters?.zoneCenter.longitude}` : ''}
            onChange={updateRulesDiscounts}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="zoneRadius"
            label="Radius (meters)"
            fullWidth
            variant="standard"
            value={rule.parameters?.zoneRadius}
            defaultValue={rule.parameters?.zoneRadius}
            onChange={updateRulesDiscounts}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="time"
            label="Time discount (%)"
            fullWidth
            variant="standard"
            value={rule.discounts?.time}
            defaultValue={rule.discounts?.time}
            onChange={updateRulesDiscounts}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="timeDays"
            label="Days"
            fullWidth
            variant="standard"
            value={rule.parameters?.timeDays.join(',')}
            defaultValue={rule.parameters?.timeDays.join(',')}
            onChange={updateRulesDiscounts}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            id="timeHours"
            label="Time range"
            fullWidth
            variant="standard"
            value={rule.parameters?.timeHours.join('-')}
            defaultValue={rule.parameters?.timeHours.join('-')}
            onChange={updateRulesDiscounts}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="paymentDebit"
            label="Debit card's discount (%)"
            fullWidth
            variant="standard"
            value={rule.discounts?.paymentDebit}
            defaultValue={rule.discounts?.paymentDebit}
            onChange={updateRulesDiscounts}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="paymentCredit"
            label="Credit card's discount (%)"
            fullWidth
            variant="standard"
            value={rule.discounts?.paymentCredit}
            defaultValue={rule.discounts?.paymentCredit}
            onChange={updateRulesDiscounts}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  );
}

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

function getStepContent(step, rule, setRule) {
  switch (step) {
    case 0:
      return <PricingWeightsForm rule={rule} setRule={setRule} />;
    case 1:
      return <PricingDiscountsForm rule={rule} setRule={setRule} />;
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
              {getStepContent(activeStep, rule, setRule)}
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
