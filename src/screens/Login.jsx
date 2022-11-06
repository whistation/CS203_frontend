import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import Modal from '@mui/material/Modal';
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/" color="inherit" href="https://mui.com/">
        Lend a Hand
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//styling for the pop-ups
const modalStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 5,
  borderRadius: 10,
  pt: 2,
  px: 4,
  pb: 3,
};

const theme = createTheme();

export default function LogIn() {

  //code for input validation of email
  const [emailErrorState, setEmailErrorState] = useState(false);
  const emailErrorMessage = "Enter a valid email."
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailErrorState(false);
    } else {
      setEmailErrorState(true);
    }
  };

  //code to handle the event when we press the log in button
  const navigate = useNavigate();
  const [Input, setInput] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setInput(
      {
        "username": data.get('email'),
        "password": data.get('password'),
      }
    );

    const input =
    {
      "username": data.get('email'),
      "password": data.get('password'),
    }
    console.log(input);

    //if some of the fields are empty prompt user to fill them, else handle auth
    if (JSON.stringify(input.username).length === 0 | JSON.stringify(input.password).length === 0) {
      console.log("some fields are empty!");
      handleBlankOpen();
    } else {
      axios.get("http://localhost:8080/listingpage",
        {
          auth:
          {
            "username": input.username,
            "password": input.password,
          }
        })
        .then((response) => {
          //successful log in
          console.log("successful log in!");
          handleLogInOpen();

        }, (error) => {
          //unsuccessful log in
          console.log("unsuccessful log in :(");
          handleFailedOpen();
        });
    }
  };

  //code to handle opening and closing of the please do not leave blank pop-up
  const [blankOpen, setBlankOpen] = useState(false);
  const handleBlankOpen = () => {
    setBlankOpen(true);
  };
  const handleBlankClose = () => {
    setBlankOpen(false);
  };

  //code to handle opening and closing of the successful log in pop-up
  const [logInOpen, setLogInOpen] = useState(false);
  const handleLogInOpen = () => {
    setLogInOpen(true);
  };
  const handleLogInClose = () => {
    //store username and userid in the local storage
    axios.get("http://localhost:8080/user?username=" + Input.username,
    ).then((response) => {
      console.log("Testing JSON extraction")
      localStorage.setItem("userid", response.data.id)
      localStorage.setItem("firstname", response.data.firstname)
    });

    localStorage.setItem("username", Input.username);
    localStorage.setItem("password", Input.password);

    setLogInOpen(false);
    navigate("/listingpage");
  };

  //code to handle opening and closing of the failed log in pop-up
  const [failedOpen, setFailedOpen] = useState(false);
  const handleFailedOpen = () => {
    setFailedOpen(true);
  };
  const handleFailedClose = () => {
    setFailedOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            {/* email field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{ maxLength: 320 }}
              helperText={emailErrorState && emailErrorMessage}
              error={emailErrorState}
              onChange={(e) => validateEmail(e)}
            />

            {/* password field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{ maxLength: 100 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signup" href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

        {/* Please do not leave fields blank pop up */}
        <Modal
          hideBackdrop
          open={blankOpen}
          onClose={handleBlankClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...modalStyle, border: '2px solid pink', width: 400, }}>
            <h2 id="child-modal-title">Please do not leave any fields blank!</h2>
            <Button onClick={handleBlankClose}>Got it!</Button>
          </Box>
        </Modal>

        {/* successful log in pop up */}
        <Modal
          hideBackdrop
          open={logInOpen}
          onClose={handleLogInClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...modalStyle, border: '2px solid lightgreen', width: 400 }}>
            <h2 id="child-modal-title">Successful Log In!</h2>
            <Button onClick={handleLogInClose}>Take me to greatness</Button>
          </Box>
        </Modal>

        {/* failed log in pop up */}
        <Modal
          hideBackdrop
          open={failedOpen}
          onClose={handleFailedClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...modalStyle, border: '2px solid pink', width: 400 }}>
            <h2 id="child-modal-title">Unsuccessful log in. Email or password is incorrect!</h2>
            <Button onClick={handleFailedClose}>Try Again</Button>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}