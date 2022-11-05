import * as React from "react";
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

import NavigationBar from "../components/NavigationBar.jsx";
import Listing from "../components/Listing.jsx";
import Listing2 from "../components/Listing2.jsx";
import Filter from "../components/Filter.jsx";
import SearchBar from "../components/SearchBar.jsx";

const theme = createTheme();
// const listings = [
//   {
//       id: 1,
//       name: "Test Project 1",
//       des: "This is a description idk what to write im losing it",
//       noOfParticipants: 5,
//       lister: {id: 1, firstname: "firstname", lastname: "lastname",contactNo: "62353535"},
//       applications: []
//   }
// ];

export default function ListingPage() {
  console.log("I am in the listing page");
 // console.log(localStorage.getItem("username"));
 // console.log(localStorage.getItem("userid"));
 // console.log(localStorage.getItem("password"));
  const [listings, setListings] = useState([{}]);
  const [search, setSearch] = useState("");
  var [image, setImage] = useState("");

  useEffect(() => {
    const getAllListings = async () => {
      const res = await axios.get("http://localhost:8080/listingpage", {
        auth: {
          username: "admin@lendahand.com",
          password: "password",
        },
      });
      console.log(res);
      setListings(res.data);
    };
    getAllListings();
    const getImage = async () => {
      const res = await axios.get("http://localhost:8080/listingpage/1/image", {
        auth: {
          username: "admin@lendahand.com",
          password: "password",
        },
      });
      setImage(res.data);
      console.log(res.data);
    };
    getImage();
  }, []);

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
        <Box sx={{ height: "10", background: "gray" }} />
        <Box
          sx={{
            background: "white",
            marginTop: 11,
          }}
        >
          <SearchBar />
        </Box>
        <Box
          sx={{
            background: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            m: 1,
            p: 2,
          }}
        >
          <Filter name={"Location"} />
          <Filter name={"Commitment"} />
          <Filter name={"Tag"} />
        </Box>
        <Container
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "white",
            marginTop: 10,
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
                <Listing2
                  name={listings.name}
                  description={listings.des}
                  id={listings.id}
                  buttonName={"apply"}
                  img={image}
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
