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
import placeholder from '../assets/image_placeholder.png';
import NavigationBar from "../components/NavigationBar.jsx";
import Listing from "../components/Listing.jsx";
import Listing2 from "../components/Listing2.jsx";

const theme = createTheme();

export default function MyListings() {
  const [listings, setListings] = useState([{}]);
  const [listingdata, setListingdata] = useState([]);
  const listingdatatemp = [];


  //getting the listing data
  useEffect(() => {
      axios.get(
        "http://localhost:8080/listingpage",
        {
          auth: {
            username: "admin@lendahand.com",
            password: "password",
          },
        },
      ).then((response) => {
        console.log("get listings success");
        setListings(response.data);

        //listingstemp temporarily stores the listing data so that I can use it right away without waiting for it to set
        const listingstemp = response.data;
        console.log(listingstemp);

        //making the listingdata array
        listingstemp.map((info, index) => {
          var imageurl = "";
          
          //api call for the image
          const getImage = async() => {
            try{
              const res = await axios.get("http://localhost:8080/listingpage/" + info.id + "/image",
                {
                  responseType: "arraybuffer"
                },
                {
                  auth: {
                    username: "admin@lendahand.com",
                    password: "password",
                  },
                })

              const imagedata = res.data;
              const contenttype = res.headers.get("content-type");
              var blob = new Blob([imagedata], { type: contenttype });
              imageurl = (URL || webkitURL).createObjectURL(blob);
              listingdatatemp[index] = {"name" : info.name, "des": info.des, "id": info.id, "imageurl": imageurl};

            } catch (error) {
              imageurl = placeholder;
              listingdatatemp[index] = {"name" : info.name, "des": info.des, "id": info.id, "imageurl": imageurl};

            }
            
          }
          getImage();
        })
        setListingdata(listingdatatemp);

  
      }, (error) => {
        console.log("get listings failed", error);
      });
  }, []);

  //checking if listingdata has been fixed
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  var show = false;  
  useEffect(()=> {
      if (listingdata.length > 0) {
        show = true;
      }
      console.log("listingdata has been updated")
      console.log("show", show, "listingdata", listingdata)
      console.log("force update")
      forceUpdate();
    }, [listingdata])

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
            {console.log("I am in the return", "listingdata", listingdata)}
              {listingdata.map((data, index) => (
                <Grid item key={data.id} xs={12} sm={6} md={4}>
                <Listing2
                  name={data.name}
                  description={data.des}
                  id={data.id}
                  buttonName={"view"}
                  imageUrl={data.imageurl}
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
