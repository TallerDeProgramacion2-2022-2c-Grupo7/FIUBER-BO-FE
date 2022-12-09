import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { RequireAuth, useAuth } from '../contexts/Auth';
import CommonTable from './common/Table';
import Container from './common/Container';
import PopUpMenu from './common/PopUpMenu';
import StatusText from './common/StatusText';
import EmailLink from './common/EmailLink';
import users from '../api/users';
import metrics from '../api/metrics';

export default function UsersContent() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [usersList, setUsersList] = useState([]);

  const loadUsers = async () => {
    const result = await users.list(auth.user, { max_results: 1000 });
    setUsersList(result);
  };

  useEffect(() => {
    document.title = 'Users - FIUBER Backoffice';
    loadUsers();
  }, []);

  const getRows = () => {
    const rows = [];
    for (const user of usersList) {
      const row = {};
      const options = [
        {
          text: 'View profile',
          handler: async () => {
            const userInfo = await users.get(auth.user, user.uid);
            navigate('/profile', { replace: true, state: { user: userInfo } });
          },
        },
        {
          text: user.is_active ? 'Block' : 'Unblock',
          confirm: true,
          popUpTitle: `Are you sure you want to ${user.is_active ? 'block' : 'unblock'} this user?`,
          popUpDetail: user.is_active ? 'The user will not be able to sign in until it is unblocked.' : 'The user will be able to use the app again.',
          handler: async () => {
            if (user.is_active) {
              await users.block(auth.user, user.uid);
              metrics.createEvent(auth.user, 'block', user.uid);
            } else {
              await users.unblock(auth.user, user.uid);
              metrics.createEvent(auth.user, 'unblock', user.uid);
            }
            await loadUsers();
          },
        },
      ];
      row.id = user.uid;
      row.fields = [
        user.uid,
        <EmailLink emailAddress={user.email} />,
        <StatusText active={user.is_active} />,
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
