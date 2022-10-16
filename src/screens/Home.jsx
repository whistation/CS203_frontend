import * as React from "react";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "./General.css";
import { CssBaseline } from "@mui/material";
import HomeBar from "../components/Homebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import bg from "../assets/backgroundpic7.jpg";
import { maxWidth } from "@mui/system";

const theme = createTheme();

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
      <Grid container sx={{ height: '100vh', width: '100vw'}}>
            <Grid item xs = {12}>
              <div style={{ backgroundImage:`url(${bg})`,backgroundRepeat:"no-repeat",backgroundSize:"contain", 
        height:3000,width: '100vw'}}>
          
              </div>
            </Grid>
            <Grid item xs = {12}>
              <h2> About us</h2>
            </Grid>
      </Grid>
      <main>
        <h1>Lend a Hand</h1>
      </main>
    </>
  );
}