import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { RequireAuth, useAuth } from '../contexts/Auth';
import CommonTable from './common/Table';
import Container from './common/Container';

export default function UsersContent() {
  const auth = useAuth();
  const [usersList, setUsersList] = useState([]);

  const loadUsers = async () => {
    const result = await auth.listUsers({ max_results: 1000 });
    window.result = result;
    setUsersList(result);
  };

  useEffect(() => {
    if (usersList.length === 0) {
      loadUsers();
    }
  });

  const getRows = () => {
    const rows = [];
    for (const user of usersList) {
      const row = {};
      row.id = user.uid;
      row.fields = [
        user.uid,
        user.email,
        user.is_active === true ? 'Active' : 'Blocked',
        user.is_admin === true ? 'Admin' : 'User',
      ];
      rows.push(row);
    }
    return rows;
  };

  return (
    <RequireAuth>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <CommonTable
                title="Users"
                headers={['User ID', 'Email Address', 'Status', 'Type']}
                rows={getRows()}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </RequireAuth>
  );
}
