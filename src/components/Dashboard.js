import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { RequireAuth } from '../contexts/Auth';
import CommonTable from './common/Table';
import Chart from './common/Chart';
import CommonContainer from './common/Container';

const headers = [
  'Date',
  'User',
  'Payment Method',
  'Payment Amount',
];

const rows = [
  { id: 1, fields: ['2022-09-29', 'User1', 'Credit card', '$1000'] },
];

function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

function Trips() {
  return (
    <CommonTable
      title="Recent tips"
      headers={headers}
      rows={rows}
    />
  );
}

export default function Dashboard() {
  return (
    <RequireAuth>
      <CommonContainer>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
