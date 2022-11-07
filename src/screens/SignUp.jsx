import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import axios from "axios";
import Modal from '@mui/material/Modal';
import validator from "validator";
import url from "../constants/global";


//styling for the pop-ups
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 10,
  borderRadius: 10,
  pt: 2,
  px: 4,
  pb: 3,
};

//function for the copyright text at the bottom
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link to="/" color="inherit" href="https://mui.com/">
        Lend A Hand
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  //function to handle the event when we press the submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const input =
    {
      "username": data.get('email'),
      "password": data.get('password'),
      "firstname": data.get('firstName'),
      "lastname": data.get('lastName'),
      "contactNo": data.get('phoneNo'),
      "authorities": "AUTH_USER"
    }

    if (input.username.length === 0 | input.password.length === 0 |
      input.firstname.length === 0 | input.lastname.length === 0 | input.contactNo.length === 0) {
      console.log("some fields are empty!");
      handleBlankOpen();

    } else {
      axios.post(`${url}/newuser`,
        {
          "username": data.get('email'),
          "password": data.get('password'),
          "firstname": data.get('firstName'),
          "lastname": data.get('lastName'),
          "contactNo": data.get('phoneNo'),
        }
        ,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
          console.log(response);
          handleOpen();
        }).catch(function (error) {
          if (error.response.status == 409) {
            handleConflictOpen();
          }
        });
    }
  };

  //code to handle opening and closing of the confirmation pop-up
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  //code to handle opening and closing of the please do not leave blank pop-up
  const [blankOpen, setBlankOpen] = useState(false);
  const handleBlankOpen = () => {
    setBlankOpen(true);
  };
  const handleBlankClose = () => {
    setBlankOpen(false);
  };

  //code to handle the opening and closing of the username taken pop-up
  const [conflictOpen, setConflictOpen] = useState(false);
  const handleConflictOpen = () => {
    setConflictOpen(true);
  };
  const handleConflictClose = () => {
    setConflictOpen(false);
  }

  //code for input validation of phone number
  const [phoneErrorState, setPhoneErrorState] = useState(false);
  function CheckIfNumber() {
    var input = event.target.value;
    if (isNaN(input) || !(input[0] == 8 || input[0] == 6 || input[0] == 9)) {
      setPhoneErrorState(true);
    } else {
      setPhoneErrorState(false);
    }
  }

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

  //code for double checking password entry
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [password, setPassword] = useState("");
  const passwordErrorMessage = "The password does not match!"
  const validatePassword = (e) => {
    if (password == e.target.value) {
      setPasswordNotMatch(false);
    } else {
      setPasswordNotMatch(true);
    }
  }


  // This is what is rendered
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* icon and "Sign up" header */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>

                {/* firstname field */}
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  inputProps={{ maxLength: 100 }}
                  autoFocus
                />
              </Grid>

              {/* lastname field */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  inputProps={{ maxLength: 100 }}

                />
              </Grid>

              {/* email field */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  inputProps={{ maxLength: 320 }}
                  helperText={emailErrorState && emailErrorMessage}
                  error={emailErrorState}
                  onChange={(e) => validateEmail(e)}
                />
              </Grid>

              {/* phone number field */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  helperText="Enter a Singaporean phone number."
                  id="phoneNo"
                  label="Phone Number"
                  name="phoneNo"
                  autoComplete="phone number"
                  type="tel"
                  inputProps={{ maxLength: 8 }}
                  onChange={CheckIfNumber}
                  error={phoneErrorState}
                />
              </Grid>

              {/* password field */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputProps={{ maxLength: 100 }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="confirm-password"
                  inputProps={{ maxLength: 100 }}
                  helperText={passwordNotMatch && passwordErrorMessage}
                  onChange={(e) => validatePassword(e)}
                  error={passwordNotMatch}
                />
              </Grid>
            </Grid>

            {/* submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            {/* stuff at the bottom */}
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>

        {/* confirmation pop up */}
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...modalStyle, border: '2px solid lightgreen', width: 400 }}>
            <h2 id="child-modal-title">Successful sign-up!</h2>
            <Button onClick={handleClose}>Take me to the log in page!</Button>
          </Box>
        </Modal>

        {/* Please do not leave fields blank pop up */}
        <Modal
          hideBackdrop
          open={blankOpen}
          onClose={handleBlankClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...modalStyle, border: '2px solid pink', width: 400 }}>
            <h2 id="child-modal-title">Please do not leave any fields blank!</h2>
            <Button onClick={handleBlankClose}>Got it!</Button>
          </Box>
        </Modal>

        {/* username taken pop up */}
        <Modal
          hideBackdrop
          open={conflictOpen}
          onClose={handleConflictClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...modalStyle, border: '2px solid pink', width: 400 }}>
            <h2 id="child-modal-title">You have already used this email address to make an account, please enter a new one!</h2>
            <Button onClick={handleConflictClose}>Got it!</Button>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}