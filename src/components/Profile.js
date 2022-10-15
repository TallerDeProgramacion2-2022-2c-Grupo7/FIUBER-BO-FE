import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid, Paper, Typography,
} from '@mui/material';
import { RequireAuth } from '../contexts/Auth';
import Container from './common/Container';
import CommonTable from './common/Table';
import StatusText from './common/StatusText';
import EmailLink from './common/EmailLink';

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
                  { id: 3, fields: [<Typography fontSize="inherit">Email address</Typography>, <EmailLink emailAddress={user.email} />] },
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
