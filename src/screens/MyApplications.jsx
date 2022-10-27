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
import AppListing from "../components/AppliedListing"
import Listing from "../components/Listing"

const theme = createTheme();

export default function MyApplications() {
  const [listings, setListings] = useState([{}]);

  useEffect(() => {
    const getAllListings = async () => {
      const res = await axios.get("http://localhost:8080/listingpage",
        {
          auth:
          {
            "username": 'admin@lendahand.com',
            "password": 'password',
          }
        });
      console.log(res);
      setListings(res.data);
    }
    getAllListings();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            background: "white",
            marginBottom: 10,
            height: "70vh"
          }}
        >
          <Grid container
            rowSpacing={4}
            sx={{ width: '100vw', background: 'white', alignItems: "baseline", }}
          >
            {listings.map((listings) => (
              <Grid item key={listings} xs={12} sm={6} md={4}>
                <AppListing name={listings.name} description={listings.des} id={listings.id} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  )
}