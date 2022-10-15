import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RequireAuth, useAuth } from '../contexts/Auth';
import CommonContainer from './common/Container';

const theme = createTheme();

export default function SignUp() {
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email && !password) {
      setErrorMessage('Email and password are required.');
    } else if (!email) {
      setErrorMessage('Email addres is required.');
    } else if (!password) {
      setErrorMessage('Password is required.');
    } else {
      try {
        await auth.createUser(email, password);
        navigate('/dashboard', { replace: true, state: { adminRegistered: true } });
      } catch (error) {
        setErrorMessage(error.message || 'An error has ocurred.');
      }
    }
  };

  React.useEffect(() => {
    document.title = 'Administrator sign-up - FIUBER Backoffice';
  }, []);

  return (
    <RequireAuth>
      <CommonContainer>
        <ThemeProvider theme={theme}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Administrator Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign Up
                      </Button>
                      {errorMessage
                      && (
                      <Alert severity="error" sx={{ marginTop: '1rem' }}>
                        <AlertTitle>{ errorMessage }</AlertTitle>
                      </Alert>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </CommonContainer>
    </RequireAuth>
  );
}
