import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid, Paper, Button, Typography,
} from '@mui/material';
import { RequireAuth } from '../contexts/Auth';
import Container from './common/Container';
import Title from './common/Title';

export default function Profile() {
  const location = useLocation();
  const user = location.state?.user;
  return (
    <RequireAuth>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Title>
                User #
                {user.uid}
                {user.is_admin && (
                <Button
                  variant="outlined"
                  color="success"
                  disableRipple
                  sx={{
                    ml: '1rem', mb: '0.2rem', p: '0.025rem', cursor: 'auto',
                  }}
                >
                  Admin
                </Button>
                )}
              </Title>
              <Grid sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '40%',
              }}
              >
                <Typography>Email address:</Typography>
                <Typography>{user.email}</Typography>
              </Grid>
              <Grid sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '40%',
              }}
              >
                <Typography>Created:</Typography>
                <Typography>{user.creation_datetime}</Typography>
              </Grid>
              <Grid sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '40%',
              }}
              >
                <Typography>Last sign in:</Typography>
                <Typography>{user.last_sign_in_datetime}</Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </RequireAuth>
  );
}
