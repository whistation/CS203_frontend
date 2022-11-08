import * as React from "react";
import "./General.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import axios from "axios";

import NavigationBar from "../components/NavigationBar";
import Typography from "@mui/material/Typography";
import url from "../constants/global";

import NoImageAppliedListing from "../components/NoImageAppliedListing";

const theme = createTheme();

export default function MyApplications() {
  const [listings, setListings] = useState([{}]);
  const [listingdata, setListingdata] = useState([]);
  const listingdatatemp = [];

  // getting all applications by user
  useEffect(() => {
    const userId = localStorage.getItem("userid");
    axios.get(`${url}/user/applications?userId=${userId}`,
      {
        auth:
        {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password")
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        console.log("get applicants success", res);
        setListings(res.data);
  })

      //   //listingstemp temporarily stores the listing data so that I can use it right away without waiting for it to set
      //   const listingstemp = res.data;
      //   console.log("listingstemp", listingstemp);

      //   //making the listingdata array
      //   listingstemp.map((info, index) => {
      //     var imageurl = "";

      //     //api call for the image
      //     const getImage = async () => {
      //       try {
      //         const res = await axios.get(`${url}/listingpage/${info.listingId}/image`,
      //           {
      //             responseType: "arraybuffer"
      //           },
      //           {
      //             auth: {
      //               username: "admin@lendahand.com",
      //               password: "password",
      //             },
      //           })

      //         const imagedata = res.data;
      //         const contenttype = res.headers.get("content-type");
      //         var blob = new Blob([imagedata], { type: contenttype });
      //         imageurl = (URL || webkitURL).createObjectURL(blob);
      //         listingdatatemp[index] = { "name": info.listingName, "des": info.listingDes, "id": info.listingId, "imageurl": imageurl };

      //       } catch (error) {
      //         imageurl = `url("https://www.kindpng.com/picc/m/55-553143_transparent-plant-cartoon-png-transparent-cartoon-plant-png.png")`;
      //         listingdatatemp[index] = { "name": info.listingName, "des": info.listingDes, "id": info.listingId, "imageurl": imageurl };
      //       }

      //     }
      //     getImage();
      //   })
      //   setListingdata(listingdatatemp);

      // }, (error) => {
      //   console.log("get applicants failed", error);
      // })

  }, []);
  const show = false;
  // //checking if listingdata has been fixed
  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);
  // const [show, setShow] = useState(true)
  // useEffect(() => {
  //   if (listingdata.length > 0) {
  //     setShow(false);
  //   }
  //   console.log("listingdata has been updated")
  //   console.log("show", show, "listingdata", listingdata)
  //   console.log("force update")
  //   forceUpdate();
  // }, [listingdata])

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
        {
          show? 
          <Box>
            <Typography variant="h5" color="#1976D2" fontFamily="Arial" sx={{top:"50%", left:"50%"}}>
              NO LISTINGS APPLIED FOR!
            </Typography>
          </Box> : null
        }
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
              position: "absolute",
              top: 120,
              left: 150
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
                <Grid item key={listings.id} xs={12} sm={6} md={4}>
                  <NoImageAppliedListing
                    name={listings.listingName}
                    description={listings.listingDes}
                    id={listings.listingId}
                  />
                </Grid>
              ))
              }
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}