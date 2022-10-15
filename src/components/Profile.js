import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid, Paper, Typography, Link,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { RequireAuth } from '../contexts/Auth';
import Container from './common/Container';
import CommonTable from './common/Table';

function StatusText({ active }) {
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

export default function Profile() {
  const location = useLocation();
  const user = location.state?.user;
  return (
    <RequireAuth>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <CommonTable
                title={`User #${user.uid}`}
                headers={['', '']}
                rows={[
                  { id: 1, fields: [<Typography fontSize="inherit">Status</Typography>, <StatusText active={user.is_active} />] },
                  { id: 2, fields: [<Typography fontSize="inherit">Full name</Typography>, `${user.first_name || ''} ${user.last_name || ''}`] },
                  { id: 3, fields: [<Typography fontSize="inherit">Email address</Typography>, <Link href={`mailto:${user.email}`} underline="none">{user.email}</Link>] },
                  { id: 4, fields: [<Typography fontSize="inherit">Car model</Typography>, user.car_model] },
                  { id: 5, fields: [<Typography fontSize="inherit">Created</Typography>, user.creation_datetime] },
                  { id: 6, fields: [<Typography fontSize="inherit">Last sign-in</Typography>, user.last_sign_in_datetime] },
                ]}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </RequireAuth>
  );
}
