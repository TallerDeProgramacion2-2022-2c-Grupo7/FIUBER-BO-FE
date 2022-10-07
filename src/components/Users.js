import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from '@mui/material';
import { RequireAuth, useAuth } from '../contexts/Auth';
import CommonTable from './common/Table';
import Container from './common/Container';
import PopUpMenu from './common/PopUpMenu';

export default function UsersContent() {
  const navigate = useNavigate();
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
      const options = [
        {
          text: 'View profile',
          handler: async () => {
            const userInfo = await auth.getUser(user.uid);
            navigate('/profile', { replace: true, state: { user: userInfo } });
          },
        },
        {
          text: user.is_active ? 'Block' : 'Unblock',
          confirm: true,
          popUpTitle: `Are you sure you want to ${user.is_active ? 'block' : 'unblock'} this user?`,
          popUpDetail: user.is_active ? 'The user will not be able to sign in until it is unblocked.' : 'The user will be able to use the app again.',
          handler: async () => {
            await auth.setUserStatus(user.uid, !user.is_active);
            await loadUsers();
          },
        },
      ];
      row.id = user.uid;
      row.fields = [
        user.uid,
        <Link href={`mailto:${user.email}`} underline="none">{user.email}</Link>,
        user.is_active === true ? (
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <CheckCircleIcon color="success" fontSize="small" sx={{ mb: -0.75, mr: '0.25rem' }} />
            </Grid>
            <Grid item>
              Active
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <CancelIcon color="error" fontSize="small" sx={{ mb: -0.75, mr: '0.25rem' }} />
            </Grid>
            <Grid item>
              Blocked
            </Grid>
          </Grid>
        ),
        user.is_admin === true ? 'Admin' : 'User',
        <PopUpMenu text="Actions" options={options} />,
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
                headers={['User ID', 'Email Address', 'Status', 'Type', '']}
                rows={getRows()}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </RequireAuth>
  );
}
