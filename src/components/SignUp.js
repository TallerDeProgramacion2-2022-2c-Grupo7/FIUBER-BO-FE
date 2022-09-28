import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RequireAuth, useAuth } from '../contexts/Auth';
import { Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        FI-UBER
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  let auth = useAuth();
  let [errorMessage, setErrorMessage] = React.useState(null);
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let email = formData.get("email");
    let password = formData.get("password");

    try {
      if (!email || !password) {
        setErrorMessage("Please fill all required values.");
      } else {
        await auth.createUser(email, password);
        navigate("/dashboard", { replace: true, state: { adminRegistered: true } });
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email address already in use.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Password should be at least 6 characters long.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email address.");
      } else {
        setErrorMessage("An error has ocurred.");
        console.log(error);
      }
    }
  };
  
  return (
    <RequireAuth>
      <ThemeProvider theme={theme}>
        <Button onClick={() => navigate("/dashboard", { replace: true })} variant="outlined" sx={{ mt: '.75rem', ml: '.75rem' }}>
          Go to dashboard
        </Button>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
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
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid> */}
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
            </Box>
          </Box>
          {errorMessage &&
          <Alert severity="error" sx={{marginTop: '1rem'}}>
            <AlertTitle>{ errorMessage }</AlertTitle>
          </Alert>}
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </RequireAuth>
  );
}
