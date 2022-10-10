import * as React from "react";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "./General.css";
import { CssBaseline } from "@mui/material";
import HomeBar from "../components/Homebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

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
      <main>
        <h1>Lend a Hand</h1>
        <h2>About us</h2>
        <p>*insert yapping here*</p>
      </main>
    </>
  );
}