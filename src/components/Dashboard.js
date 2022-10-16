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
  { id: 1, fields: ['2022-10-17 19:05:59', '789789789', 'Login'] },
  { id: 1, fields: ['2022-10-17 19:05:23', '789789789', 'Signup'] },
  { id: 1, fields: ['2022-10-17 19:04:12', '456456456', 'Login'] },
  { id: 1, fields: ['2022-10-17 19:02:25', '123123123', 'Login'] },
  { id: 1, fields: ['2022-10-17 19:01:04', '123123123', 'Password reset'] },
];

function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('10-10', 2),
  createData('10-11', 5),
  createData('10-12', 8),
  createData('10-13', 3),
  createData('10-14', 4),
  createData('10-15', 1),
  createData('10-16', 4),
  createData('10-17', 2),
  createData('10-18', 5),
  createData('10-19', 8),
  createData('10-20', 3),
  createData('10-21', 4),
  createData('10-22', 1),
  createData('10-23', 4),
  createData('10-24', 2),
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
                height: 300,
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
              <Trips />
            </Paper>
          </Grid>
        </Grid>
      </CommonContainer>
    </RequireAuth>
  );
}
