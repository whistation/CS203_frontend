import * as React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { sizing } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import NavigationBar from "../components/NavigationBar.jsx";
import Listing from "../components/Listing.jsx";
import Listing2 from "../components/Listing2.jsx";
import { ConstructionOutlined } from "@mui/icons-material";

const theme = createTheme();

export default function MyListings() {
  const [listings, setListings] = useState([{}]);
  const username = localStorage.getItem("username");
  var [imageData, setImageData] = useState([]);
  var [contentType, setContentType] = useState("");

  useEffect(() => {
    console.log("call listing");
    const getAllListings = async () => {
      const res = await axios.get(
        "http://localhost:8080/listingpage",
        {
          auth: {
            username: "admin@lendahand.com",
            password: "password",
          },
        },
        {
          data: {
            username: "username",
          },
        }
      );
      console.log("res.data", res.data);
      setListings(res.data);

      console.log("hello");
      console.log(res.data);
      setListings(res.data);
      console.log("listings");
      console.log(listings);
      //console.log(listings[0]);
      //console.log("this is photo");
      //console.log(listings[0].photo);
      // console.log("this is picbyte");
      //console.log(listings[0].photo.picByte);
      // console.log(handleImage(listings[0].photo.picByte, listings[0].photo.type));
      console.log("this is shuyi");
    };
    console.log("call listing");
    getAllListings();

    // console.log(handleImage(listings[0].photo.picByte, listings[0].photo.type));
    console.log("listings");
    console.log(listings);

    const getImage = async () => {
      const res = await axios.get("http://localhost:8080/listingpage/1/image", 
      {
        responseType: "arraybuffer",
      },
      {
        auth: {
          username: "admin@lendahand.com",
          password: "password",
        },
      });
      const imagedata = res.data;
      setImageData(imagedata);
      console.log("logging image in mylistings");
      console.log(imagedata);
      console.log(imageData);
      const contenttype = res.headers.get("content-type");
      setContentType(contenttype);
      console.log(contenttype);
      //console.log(res.data);
    };
    getImage();
    //console.log(handleImage(listings[0].photo.picByte, listings[0].photo.type));

    // console.log(listings[0].photo.picByte);
    // console.log(listings[0].photo.type);
  }, []);

  const navigate = useNavigate();
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
          >
            Create New Listing
          </Button>
        </Container>
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
            {console.log(imageData)}
            {listings.map((listings) => (
              <Grid item key={listings.id} xs={12} sm={6} md={4}>
                <Listing2
                  name={listings.name}
                  description={listings.des}
                  id={listings.id}
                  buttonName={"view"}
                  image={{imageData}}
                  contentType={{contentType}}
                />
              </Grid> 
            ))}
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

// const SearchBar = () => (
//   <form>
//     <TextField
//       id="search-bar"
//       className="text"
//       label="Search"
//       variant="outlined"
//       placeholder="Project Title..."
//       size="small"
//       sx={{
//         width: 975,
//       }}
//     />
//     <IconButton type="submit" aria-label="search">
//       <SearchIcon style={{ fill: "blue" }} />
//     </IconButton>
//   </form>
// );

// function ElevationScroll(props) {
//   const { children, window } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }

// ElevationScroll.propTypes = {
//   children: PropTypes.element.isRequired,
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

// export default function ListingPage(props) {
//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <ElevationScroll {...props}>
//         <AppBar sx={{ background: "white" }}>
//           <Toolbar>
//             <Typography variant="h6" component="div" sx={{ color: "black" }}>
//               Scroll to elevate App bar
//             </Typography>
//           </Toolbar>
//         </AppBar>
//       </ElevationScroll>
//       <Toolbar />
//       <Toolbar sx={{ background: "black" }}>
//         {/* <SearchBar /> */}
//       </Toolbar>
//       <Container>
//         <Box sx={{ my: 2 }}>
//           {[...new Array(30)]
//             .map(
//               () => `Cras mattis consectetur purus sit amet fermentum.
// Cras justo odio, dapibus ac facilisis in, egestas eget quam.
// Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
// Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
//             )
//             .join("\n")}
//         </Box>
//       </Container>
//     </React.Fragment>
//   );
// }

// img = {handleImage(listings.photo.picByte, listings.photo.type)}
// img={()=> {
//   console.log(listings.id);
//   console.log(listings.photo.picByte);
//   const imageBytes = listings.photo.picByte;
//   const type = listings.photo.type;
//   var blob = new Blob([imageBytes], { type: type });
//   var imageUrl = URL.createObjectURL(blob);
//   console.log("This is imageurl");
//   console.log(imageUrl);
//   return imageUrl;
// }}
