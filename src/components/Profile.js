import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid, Paper, Typography,
} from '@mui/material';
import { RequireAuth } from '../contexts/Auth';
import Container from './common/Container';
// import Title from './common/Title';
import CommonTable from './common/Table';

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
                  { id: 1, fields: [<Typography fontSize="inherit">Status</Typography>, user.is_active ? 'Active' : 'Blocked'] },
                  { id: 2, fields: [<Typography fontSize="inherit">Email address</Typography>, user.email] },
                  { id: 3, fields: [<Typography fontSize="inherit">Created</Typography>, user.creation_datetime] },
                  // eslint-disable-next-line max-len
                  { id: 4, fields: [<Typography fontSize="inherit">Last sign-in</Typography>, user.last_sign_in_datetime] },
                ]}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </RequireAuth>
  );
}
