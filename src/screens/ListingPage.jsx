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
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import placeholder from '../assets/image_placeholder.png';
import NavigationBar from "../components/NavigationBar.jsx";
import Listing from "../components/Listing.jsx";
import { listItemAvatarClasses } from "@mui/material";

const theme = createTheme();

export default function ListingPage() {
  console.log("I am in the listing page");

  //user authentication details
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const listingDefault = [
    {
      id: 1,
      name: "Nothing Here Right Now!",
      des: "Please click the Search Button for Results (Don't press the Enter Key)",
    },
  ];
  //set default before search to prompt for search
  const [listings, setListings] = useState(listingDefault);

  //set default search to space character
  const [search, setSearch] = useState(" ");

  // const [commitment, setCommitment] = useState("All");

  // const handleCommitmentFilter = async(event) => {
  //   const value = await event.target.value;
  //   setCommitment(event.target.value);
  // };

  const [tag, setTag] = useState("All");

  const handleTagFilter = async(event) => {
    const value = await event.target.value;
    //console.log(value);
    setTag(value);
    //console.log(tag);
  };

  React.useEffect(() => {
    console.log(tag);
    handleSearching();
  }, [tag]);

  // const [location, setLocation] = useState("All");

  // const handleLocationFilter = async(event) => {
  //   const value = await event.target.value;
  //   setLocation(event.target.value);
  // };

  // const [filters, setFilters] = useState({});

  // const handleFilters = (location, tag, commitment) => {
  //   const finalFilter = {
  //     location: location.location,
  //     tag: tag.tag,
  //     commitment: commitment.commitment,
  //     username: "All"
  //   };
  //   setFilters(finalFilter);
  // };
  const [listingdata, setListingdata] = useState([]);
  const listingdatatemp = [];

  const handleSearching = () => {
    //handleFilters({ location }, { tag }, { commitment });
    //console.log({ filters });
    //const filtering = {filters}.filters;
    //console.log(filtering);
    console.log("searching now");
    console.log(tag);
    const getAllListings = async () => {
      const res = await axios.get("http://localhost:8080/listingpage", 
      {
        params: {
          inName: `${search}`,
        },
        auth: {
          username: username,
          password: password,
        },
      });
      setListings(res.data);
    };
    
    getAllListings().then(
      ()=> {
        console.log("get listings success", listings)
        const listingstemp = listings;
        //making the listingdata array
        listingstemp.map((info, index) => {
          var imageurl = "";

          //api call for the image
          const getImage = async () => {
            try {
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
              listingdatatemp[index] = { "name": info.name, "des": info.des, "id": info.id, "imageurl": imageurl };

            } catch (error) {
              imageurl = placeholder;
              listingdatatemp[index] = { "name": info.name, "des": info.des, "id": info.id, "imageurl": imageurl };

            }
          }
          getImage();
        })
        setListingdata(listingdatatemp);

      }, (error) => {
        console.log("get listings failed", error);
      })

  };

  //checking if listingdata has been fixed
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  var show = false;

  useEffect(() => {
    if (listingdata.length > 0) {
      show = true;
    }
    console.log("listingdata has been updated")
    console.log("show", show, "listingdata", listingdata)
    console.log("force update")
    forceUpdate();
  }, [listingdata])

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
          {/* <SearchBar /> */}
          <form>
            <TextField
              id="search-bar"
              className="text"
              label="Search"
              variant="outlined"
              placeholder="Project Title..."
              size="small"
              sx={{
                width: "92vw",
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              //type="submit"
              aria-label="search"
              onClick={() => {
                handleSearching();
              }}
              //onClick={()=>{console.log("hello");}}
            >
              <SearchIcon style={{ fill: "blue" }} />
            </IconButton>
          </form>
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
          <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Tag</InputLabel>
              <Select
                labelId="tag"
                id="tag"
                value={tag}
                label="tag"
                onChange={handleTagFilter}
              >
                <MenuItem value={"Coastal"}>Coastal</MenuItem>
                <MenuItem value={"Marine"}>Marine</MenuItem>
                <MenuItem value={"Jungle"}>Jungle</MenuItem>
                <MenuItem value={"Clean Energy"}>Clean Energy</MenuItem>
                <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                <MenuItem value={"Recycling and Waste"}>
                  Recycling and Waste
                </MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
                <MenuItem value={"All"}>All</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
            {console.log("I am in the return", "listingdata", listingdata)}
            {listingdata.map((data, index) => (
              console.log("I am in the map, and I am rendering this listing", data.name),
              <Grid item key={data.id} xs={12} sm={6} md={4}>
                <Listing
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
