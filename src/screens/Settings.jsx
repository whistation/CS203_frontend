import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./General.css";
import { useState } from "react";
import axios from "axios";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import validator from "validator";

import NavigationBar from "../components/NavigationBar.jsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, background: "white" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => { setValue(newValue); };

  const putApplication = async (userId, listingId) => {
    const IpAddresss = 0;
    const res = await axios.put("/user/update/name/${userId}", {
      data: { firstname: "firstname", lastname: "lastname" },
      params: { userId: userId },
      auth: { username: "admin@lendahand.com", password: "password" }
    })
  };
  const handleNameChangePasswordSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const input = {
      "newpassword": data.get('newpassword')
    }

    if (JSON.stringify(input.newpassword).length === 0) {
      console.log("some fields are empty!");
      handleBlankOpen();
    } else {
      axios.post(
          'http://localhost:8080/resetting/password/' + localStorage.getItem("userid"),
          {auth:
                {
                  "username": localStorage.getItem("username"),
                  "password": localStorage.getItem("password"),
                }
          })
          .then((response) => {
            console.log("successful update!");
            handleLogInOpen();

          }, (error) => {
            console.log("unsuccessful update");
            handleFailedOpen();
          });
    }
  }

  //code to handle opening and closing of the confirmation pop-up
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  //code to handle opening and closing of the please do not leave blank pop-up
  const [blankOpen, setBlankOpen] = useState(false);
  const handleBlankOpen = () => {
    setBlankOpen(true);
  };
  const handleBlankClose = () => {
    setBlankOpen(false);
  };


  //code for input validation of phone number
  const [phoneErrorState, setPhoneErrorState] = useState(false);
  function CheckIfNumber() {
    var input = event.target.value;
    // useEffect(() => {
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
  }

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

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} disableGutters sx={{ background: "white", direction: "row", justifyContent: "flex-start", width: "100vw", display: "flex", flexDirection: "row" }}>
        <CssBaseline />
        <Box disableGutters sx={{ background: "white", }}>
          <NavigationBar />
        </Box>
        <Container disableGutters sx={{ background: "white", direction: "column", justifyContent: "flex-start", width: "20vw", height: '80vh'}}>
          <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Privacy" {...a11yProps(1)} />
            <Tab label="Preferences" {...a11yProps(2)} disabled />
            <Tab label="Report" {...a11yProps(3)} disabled />
            <br ></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Tab label="About" {...a11yProps(4)} disabled />
          </Tabs>
        </Container>
        {/*<Container maxWidth={false} disableGutters sx={{ background: "white", direction: "column", justifyContent: "center", width: "100vw", }}>*/}
          {/*<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', }}>*/}
            <Container disableGutters sx={{ background: "white" }}>
              <TabPanel value={value} index={0}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100 }} />
                </IconButton>
                <Typography component="h1" variant="h5"> Welcome back, {localStorage.getItem('firstname')}. </Typography>

                <Typography variant="body2" sx={{ p: 2 }}> Edit your info and settings to make Lend a Hand work better for you. <a href='#'>Learn more </a></Typography>

                <Box component="form" noValidate onSubmit={handleNameChangePasswordSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={5} direction="column" justifyContent="center" alignItems="stretch" >
                    <Grid item spacing={2}>
                      <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" inputProps={{ maxLength: 100 }} autoFocus />
                      <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" inputProps={{ maxLength: 100 }} />
                      <TextField required fullWidth id="phoneNo" label="Phone Number" name="phoneNo" autoComplete="phone number" type="tel" inputProps={{ maxLength: 8 }} onChange={CheckIfNumber} error={phoneErrorState} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="left" spacing={2}> </Grid>
                        <Grid item>
                          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Save Changes </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <Typography component="h1" variant="h5" sx={{ p: 2 }}> Change your password </Typography>
                <Typography variant="body2" sx={{p: 1}}> Choose a strong password and don't reuse it for other accounts. <a href='#'>Learn more </a></Typography>
                <Box component="form" noValidate onSubmit={handleNameChangePasswordSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={5} direction="column" justifyContent="center" alignItems="stretch">
                    <Grid item spacing={2}>
                      <TextField required fullWidth name="password" label="Current Password" type="password" id="password" autoComplete="new-password" inputProps={{ maxLength: 100 }} onChange={(e) => setPassword(e.target.value)} />
                      <TextField required fullWidth name="password" label="New Password" type="password" id="password" autoComplete="new-password" inputProps={{ maxLength: 100 }} onChange={(e) => setPassword(e.target.value)} />
                      <TextField required fullWidth name="confirmpassword" label="Confirm Password" type="password" id="confirmpassword" autoComplete="confirm-password" inputProps={{ maxLength: 100 }} helperText={passwordNotMatch && passwordErrorMessage} onChange={(e) => validatePassword(e)} error={passwordNotMatch} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="left" spacing={2}> </Grid>
                        <Grid item>
                          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Save Changes </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>

              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
            </Container>
          {/*</Box>*/}
        {/*</Container>*/}
      </Container>
    </ThemeProvider>);
}

//
// export default function Settings(){
//     return(
//       <>
//         <main>
//           <h1>SETTINGS PAGE</h1>
//             <p>
//               Here users can change their profile picture, name, email, phone number and password.
//             </p>
//
//             <p></p>
//         </main>
//
//         <nav>
//           <Link to="/listingpage"> Back to LISTING PAGE </Link>
//         </nav>
//       </>
//     )
//   }