import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { RequireAuth, useAuth } from '../contexts/Auth';
import CommonTable from './common/Table';
import Chart from './common/Chart';
import CommonContainer from './common/Container';
import Title from './common/Title';
import metrics from '../api/metrics';

export default function Dashboard() {
  const auth = useAuth();
  const { user } = auth;
  const [recentEvents, setRecentEvents] = useState([]);
  const [stats, setStats] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    document.title = 'Dashboard - FIUBER Backoffice';

    const loadRecentEvents = async () => {
      const events = await metrics.listRecentEvents(user, 5);
      setRecentEvents(events);
    };

    const loadMetrics = async () => {
      const metricsList = await metrics.getStats(user);
      setStats(metricsList);
    };

    const loadSummary = async () => {
      const usersSummary = await metrics.getUsersSummary(user);
      setSummary(usersSummary);
    };

    loadRecentEvents();
    loadMetrics();
    loadSummary();
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
              <Chart data={stats} />
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
                  {summary.total_users}
                </Typography>
                <Title>Total blocked users</Title>
                <Typography component="p" variant="h4">
                  {summary.total_blocked_users}
                </Typography>
                <Title>Total admins</Title>
                <Typography component="p" variant="h4">
                  {summary.total_admins}
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
