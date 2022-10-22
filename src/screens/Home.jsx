import * as React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "./General.css";
import CssBaseline from '@mui/material/CssBaseline';
import HomeBar from "../components/Homebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import bg from "../assets/backgroundpic7.jpg";

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Lend a Hand
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const aboutUs = 'Lend a Hand is a platform for Singaporeans seeking volunteers or interested to volunteer for green projects.';

const ourMission = 'Every initiative, regardless of scale, is important to combat climate change. As such, we at Lend a Hand aim to provide a platform to lower the barrier of entry and allow ordinary Singaporeans to fuel smaller-scale green projects to help make a difference in fighting climate change.';

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth={false}
          sx={{
            background: "white",
            direction: "column",
            justifyContent: "flex-start",
            width: "100vw",
          }}
        >
          <CssBaseline />
          <Box

            sx={{
              background: "white",
            }}
          >
            <HomeBar />
          </Box>
        </Container>
      </ThemeProvider>
      <Grid container sx={{ height: '100vh', width: '100vw' }}>
        <CssBaseline />
        <Grid item
          xs={12}
          sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: "white",
            backgroundImage: `url(${bg})`,
            height: "100%"
          }}>
          <Typography
            component="h1"
            variant="h1"
            color="white"
            sx={{
              position: 'relative',
              pt: 50,
              fontWeight: 'bold',
            }}>
            Lend a Hand
          </Typography>
        </Grid>
        <Grid container sx={{ height: '9vh', width: '100vw' }} id="aboutUs">
          <CssBaseline>
            <Grid item xs={12} sx={{ backgroundColor: "lightgray" }}>
              <h2> About us </h2>
            </Grid>
          </CssBaseline>
        </Grid>
        <Grid item xs={3} ></Grid>
        <Grid item xs={6}>
          <h4>
            {aboutUs}
          </h4>
          <p>
            {ourMission}
          </p>
          <p>
            Sign up for an account today! With an account, you can not only volunteer for existing projects but also list green projects of your own.
          </p>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3} sx={{ height: '8vh' }}></Grid>
        <Grid item xs={6} sx={{ height: '8vh' }}>
          <Copyright sx={{ mt: 4, mb: 4 }} />
        </Grid>
        <Grid item xs={3} sx={{ height: '8vh' }}></Grid>
      </Grid>

    </>
  );
}