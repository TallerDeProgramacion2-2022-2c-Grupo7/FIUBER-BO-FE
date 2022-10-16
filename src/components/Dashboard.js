import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { RequireAuth } from '../contexts/Auth';
import CommonTable from './common/Table';
import Chart from './common/Chart';
import CommonContainer from './common/Container';
import Title from './common/Title';

const headers = [
  'Date',
  'User',
  'Event type',
];

const rows = [
  { id: 1, fields: ['2022-10-17 19:05:59', 'dQt7Lkn8JpOI1SHa45qKqsXUwI', 'Login'] },
  { id: 1, fields: ['2022-10-17 19:05:23', 'dQt7Lkn8JpOI1SHa45qKqsXUwI', 'Signup'] },
  { id: 1, fields: ['2022-10-17 19:04:12', 'dQt7Lkn8JpOI1SHa45qKq7lzHG', 'Login'] },
];

function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('10-17', 2),
  createData('10-18', 5),
  createData('10-19', 8),
  createData('10-20', 3),
  createData('10-21', 4),
  createData('10-22', 1),
  createData('10-23', 4),
];

function Trips() {
  return (
    <CommonTable
      title="Recent events"
      headers={headers}
      rows={rows}
    />
  );
}

export default function Dashboard() {
  React.useEffect(() => {
    document.title = 'Dashboard - FIUBER Backoffice';
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
                height: 240,
              }}
            >
              <Chart data={data} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <>
                <Title>Total users</Title>
                <Typography component="p" variant="h4">
                  10
                </Typography>
                <br />
                <Title>Total blocked users</Title>
                <Typography component="p" variant="h4">
                  2
                </Typography>
              </>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Trips />
            </Paper>
          </Grid>
        </Grid>
      </CommonContainer>
    </RequireAuth>
  );
}
