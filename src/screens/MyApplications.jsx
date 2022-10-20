import * as React from "react";
import { Link } from "react-router-dom";
import "./General.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import {useState, useEffect} from "react";
import axios from "axios";

import NavigationBar from "../components/NavigationBar";
import AppListing from "../components/AppliedListing"

const theme = createTheme();

export default function MyApplications() {
  const [listings, setListings] = useState([{}]);

  useEffect(() => {
    const getAllListings = async () => {
      const res = await axios.get("http://localhost:8080/listingpage");
      console.log(res);
      setListings(res.data);
    }
    getAllListings();
	}, []);
  
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
            <NavigationBar/>
          </Box>
        </Container>
        <Container
        disableGutters
        sx={{ 
          display: "flex",
          justifyContent: "center",
          background: "yellow",
          marginTop: 15,
          marginBottom: 10,
           }}
        >
          
          <Grid container 
          sx={{width:'100vw', background:'blue'}}
          >
            {listings.map((listings) => (
              <Grid item key={listings} xs={12} sm={6} md={4}>
                <AppListing name={listings.name} description={listings.des} id={listings.id}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  )
}