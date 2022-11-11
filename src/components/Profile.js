import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { RequireAuth } from '../contexts/Auth';
import Container from './common/Container';
import CommonTable from './common/Table';
import StatusText from './common/StatusText';
import EmailLink from './common/EmailLink';

export default function Profile() {
  const location = useLocation();
  const user = location.state?.user;
  useEffect(() => {
    document.title = 'User profile - FIUBER Backoffice';
  }, []);
  const fullName = (user.first_name && user.last_name) ? `${user.first_name} ${user.last_name}` : '';
  return (
    <RequireAuth>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <CommonTable
                title="User profile"
                headers={['', '']}
                rows={[
                  { id: 1, fields: [<Typography fontSize="inherit">User ID</Typography>, user.uid] },
                  { id: 2, fields: [<Typography fontSize="inherit">Status</Typography>, <StatusText active={user.is_active} />] },
                  { id: 3, fields: [<Typography fontSize="inherit">Full name</Typography>, fullName || '-'] },
                  { id: 4, fields: [<Typography fontSize="inherit">Email address</Typography>, <EmailLink emailAddress={user.email} />] },
                  { id: 5, fields: [<Typography fontSize="inherit">Car model</Typography>, user.car_model || '-'] },
                  { id: 6, fields: [<Typography fontSize="inherit">Signup datetime</Typography>, user.creation_datetime] },
                  { id: 7, fields: [<Typography fontSize="inherit">Last signin datetime</Typography>, user.last_sign_in_datetime] },
                ]}
              />
              <CommonTable
                title="Metrics"
                headers={['', '']}
                rows={[
                  { id: 1, fields: [<Typography fontSize="inherit">Trips taken</Typography>, 7] },
                  { id: 2, fields: [<Typography fontSize="inherit">Trips cancelled</Typography>, 1] },
                  { id: 3, fields: [<Typography fontSize="inherit">Ratings made</Typography>, 3] },
                ]}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </RequireAuth>
  );
}
