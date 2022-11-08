import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar.jsx";
import CreatedListing from "../components/CreatedListing.jsx";
import NoImageListing from "../components/NoImageListing.jsx";
import { TroubleshootOutlined } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import url from "../constants/global";

const theme = createTheme();

//styling for the pop-ups
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 10,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([{}]);
  const [listingdata, setListingdata] = useState([]);
  const listingdatatemp = [];

  const userid = localStorage.getItem("userid");
  console.log(userid);

  //getting the listing data
  useEffect(() => {
    axios.get(
      `${url}/listingpage/mylistings?userId=${userid}`,
      {
        auth: {
          username: "admin@lendahand.com",
          password: "password",
        },
      },
    ).then((response) => {
      console.log("get listings success");
      setListings(response.data);
    })
    }, []);

    //   //listingstemp temporarily stores the listing data so that I can use it right away without waiting for it to set
    //   const listingstemp = response.data;
    //   console.log(listingstemp);

    //   //making the listingdata array
    //   listingstemp.map((info, index) => {
    //     var imageurl = "";

    //     //api call for the image
    //     const getImage = async () => {
    //       try {
    //         const res = await axios.get(`${url}/listingpage/${info.id}/image`,
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
    //         listingdatatemp[index] = { "name": info.name, "des": info.des, "id": info.id, "imageurl": imageurl };

    //       } catch (error) {
    //         imageurl = `url("https://www.kindpng.com/picc/m/55-553143_transparent-plant-cartoon-png-transparent-cartoon-plant-png.png")`;
    //         listingdatatemp[index] = { "name": info.name, "des": info.des, "id": info.id, "imageurl": imageurl };

    //       }

    //     }
    //     getImage();
    //   })
    //   setListingdata(listingdatatemp);


    // }, (error) => {
    //   console.log("get listings failed", error);
    // });
  const show = false;
  //const [show, setShow] = useState(true);
  
  // //checking if listingdata has been fixed
  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);

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
              NO LISTINGS CREATED!
            </Typography>
          </Box> : null
        }
        
        <CssBaseline />
        <Box
          disableGutters
          sx={{
            backgroundColor: "white",
          }}
        >
          <NavigationBar />
        </Box>
        <Box sx={{ height: "70px", background: "white" }} />
        <Box
          sx={{
            background: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 1,
            p: 2,
          }}
        >
          <Button
            size="small"
            endIcon={<AddIcon />}
            onClick={() => navigate("/listingpage/createlisting")}
            sx={{ position: "absolute", top: 90, right: 25 }}
          >
            Create New Listing
          </Button>
        </Box>
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "white",
            marginBottom: 10,
            position: "absolute",
            top: 170,
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
              console.log("I am in the map, and I am rendering this listing", listings.name),
              <Grid item key={listings} xs={12} sm={6} md={4}>
                <NoImageListing
                  name={listings.name}
                  description={listings.des}
                  id={listings.id}
                />
              </Grid>
            ))
            }

          </Grid>
        </Container>


      </Container>
    </ThemeProvider>
  );
}

