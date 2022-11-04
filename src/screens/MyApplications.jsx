import * as React from "react";
import { Link } from "react-router-dom";
import "./General.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import axios from "axios";

import NavigationBar from "../components/NavigationBar";
import Listing from "../components/Listing"

const theme = createTheme();

export default function MyApplications() {
  const [listings, setListings] = useState([{}]);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const getAllApps = async () => {
      const res = await axios.get(`http://localhost:8080/${userId}/applications`,
        {
          auth:
          {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
          }
        },
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Content-Type': 'application/json',
          }
        });
      console.log(res);
      setListings(res.data);
    }
    getAllApps();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            background: "white",
            direction: "column",
            justifyContent: "flex-start",
            width: "100vw",
          }}
        >
          <CssBaseline />
          <Box
            disableGutters
            sx={{
              background: "white",
            }}
          >
            <NavigationBar />
          </Box>
          <Box sx={{ height: "70px", background: "white" }} />
          <Container
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "center",
              background: "white",
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              spacing={4}
              sx={{
                width: "100vw",
                background: "white",
              }}
            >
              {listings.map((listings) => (
                <Grid item key={listings} xs={12} sm={6} md={4}>
                  <Listing name={listings.name} description={listings.des} id={listings.id} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}