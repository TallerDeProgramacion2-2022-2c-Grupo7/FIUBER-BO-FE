import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { RequireAuth, useAuth } from '../contexts/Auth';
import CommonTable from './common/Table';
import Chart from './common/Chart';
import CommonContainer from './common/Container';
import Title from './common/Title';

export default function Dashboard() {
  const auth = useAuth();
  const [recentEvents, setRecentEvents] = useState([]);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    document.title = 'Dashboard - FIUBER Backoffice';

    const loadRecentEvents = async () => {
      const events = await auth.listRecentEvents();
      setRecentEvents(events);
    };

    const loadMetrics = async () => {
      const metricsList = await auth.listMetrics();
      setMetrics(metricsList);
    };

    loadRecentEvents();
    loadMetrics();
  }, []);

  return (
    <RequireAuth>
      <CommonContainer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <Chart data={metrics} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <>
                <Title>Total users</Title>
                <Typography component="p" variant="h4">
                  10
                </Typography>
                <Title>Total blocked users</Title>
                <Typography component="p" variant="h4">
                  2
                </Typography>
                <Title>Total admins</Title>
                <Typography component="p" variant="h4">
                  2
                </Typography>
              </>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <CommonTable
                title="Recent events"
                headers={[
                  'Date',
                  'User',
                  'Event type',
                ]}
                rows={recentEvents}
              />
            </Paper>
          </Grid>
        </Grid>
      </CommonContainer>
    </RequireAuth>
  );
}
