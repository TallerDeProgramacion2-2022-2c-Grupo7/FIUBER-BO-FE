import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  InputLabel, Select, MenuItem, Box, FormControl,
} from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid,
} from 'recharts';
import Title from './Title';

export default function Chart({ data }) {
  const theme = useTheme();
  const [metric, setMetric] = React.useState('logins');

  const handleChange = (event) => {
    setMetric(event.target.value);
  };

  return (
    <>
      <div
        style={{
          p: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 40,
        }}
      >
        <Title>Last 15 days</Title>
        <Box sx={{ minWidth: 160, mr: '1rem' }}>
          <FormControl variant="standard" fullWidth size="small" sx={{ mt: -0.5 }}>
            <InputLabel id="metric-select-label">Metric</InputLabel>
            <Select
              labelId="metric-select-label"
              id="metric-select"
              value={metric}
              label="Metric"
              onChange={handleChange}
            >
              <MenuItem value="logins">Logins</MenuItem>
              <MenuItem value="signups">Signups</MenuItem>
              <MenuItem value="passwordResets">Password resets</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 32,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Number of events
            </Label>
          </YAxis>
          <Tooltip contentStyle={{ borderRadius: 0 }} />
          <Line
            isAnimationActive
            type="linear"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
