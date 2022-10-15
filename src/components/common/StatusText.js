import React from 'react';
import { Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function StatusText({ active }) {
  if (active) {
    return (
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <CheckCircleIcon color="success" fontSize="small" sx={{ mb: -0.75, mr: '0.25rem' }} />
        </Grid>
        <Grid item>
          Active
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <CancelIcon color="error" fontSize="small" sx={{ mb: -0.75, mr: '0.25rem' }} />
      </Grid>
      <Grid item>
        Blocked
      </Grid>
    </Grid>
  );
}
