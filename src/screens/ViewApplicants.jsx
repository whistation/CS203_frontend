import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import placeholder from '../assets/image_placeholder.png';
import {useState} from "react";
import Modal from '@mui/material/Modal';
import {Navigate, useNavigate} from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';


//create theme
const theme = createTheme();

//styling for the confirmation pop-up
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid lightgreen',
  boxShadow: 10,
  pt: 2,
  px: 4,
  pb: 3,
};

//boolean to ensure that the url is not assigned more than once
var urlcreated = false;

//get the listing id
const listingid = 8;

//exporting the actual app!
export default function ViewApplicants() {

  //code to handle opening and closing of the confirmation pop-up
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //function that fires when the user confirms that they want to delete the listing
  const navigate = useNavigate();
  const handleDelete = () => {
    axios.delete("http://localhost:8080/listingpage/removal/" + listingid, //add the appropriate listingid
    {auth: 
      {
        "username": "admin@lendahand.com",
        "password": "password"
      }
    }).then((res) => {
      console.log("successful deletion!");
      console.log(res);
      handleClose();
      navigate("/listingpage/mylistings");

    }, (error) => {
      console.log("unsuccessful deletion");
      console.log(error);
    })
  };

  //variables to set the project title, description, location, tag, commitment displayed
  const [title, setTitle] = useState("Project title");
  const [description, setDescription] = useState("Project description");
  const [location, setLocation] = useState("Location");
  const [tag, setTag] = useState("Tag");
  const [commitment, setCommitment] = useState("Commitment");

  //variable to set the imageurl for the picture
  const [imageurl, setImageurl] = useState(`url(${placeholder})`);

  //variable to hold the array of applicants
  var applicants = {};

  //api call to get the applicants, listing details and listing image
  axios.get("http://localhost:8080/listingpage/" + listingid, //need to pass in the relevant listingid in this url 
    {auth: 
      {
        "username": "admin@lendahand.com",
        "password": "password"
      }
    }
  ).then((response) => {
    // console.log("successfully got the listing data");
    // console.log(response);

    //set listing details
    setTitle(response.data.name);
    setDescription(response.data.des);
    setLocation(response.data.location);
    setTag(response.data.tag.value);
    setCommitment(response.data.commitment);
    
    //set the imageurl to display
    if (urlcreated == false) {
      var blob = new Blob([response.data.photo.picByte], { type: response.data.photo.type });
      var url = URL.createObjectURL(blob);
      const feederUrl = url.substring(5);
      var xing = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png";
      setImageurl(`url(${feederUrl})`);
      console.log("logging the url");

      urlcreated = true;
    }

    //set the array of applicants
    applicants = response.data.applications;

  }, (error) => {
    console.log("unsuccessful get of listing data");
    console.log(error);
  });

  console.log(imageurl);


  
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', width: '100vw'}}>
        <CssBaseline />
        
        {/* image component on the left */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: imageurl
          }}
        >
        </Grid>

        {/* text component on the right */}
        <Grid 
          item 
          xs={12} 
          sm={8} 
          md={5} 
          component={Paper} 
          elevation={6} 
          square>
          <Box
            // backgroundColor="blue"
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          
          {/* listing preview portion */}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <VisibilityIcon />
            </Avatar>

            <Typography component="h1" variant="h4">
              Listing preview
            </Typography>

            <Box 
              noValidate 
              sx={{ mt: 2}} 
              // backgroundColor="red"
              >

              {/* Project title field */}
              <Typography sx={{color:"#212121",ml:0.5}} align="left" variant="h6"  component="div">
                  Project title:
              </Typography>
              <Box 
              width="535px"
              sx={{py:1, px:1, border:"1px solid grey", borderRadius:1.5, overflow:"hidden", overflowX:"scroll"}}>
                <Typography sx={{color:"#838383"}} align="left" variant="subtitle1" component="div">
                    {title}
                </Typography>
              </Box>

              {/* Project description field */}
              <Typography sx={{color:"#212121",ml:0.5, mt:2}} align="left" variant="h6"  component="div">
                  Project Description:
              </Typography>
              <Box 
              width="535px"
              height="120px"
              sx={{py:1, px:1, border:"1px solid grey", borderRadius:1.5, overflow:"hidden", overflowX:"scroll", overflowY:"scroll", display:"flex", flexDirection:"column"}}>
                <Typography sx={{color:"#838383"}} align="left" variant="subtitle1" component="div">
                  {description}

                </Typography>
              </Box>

              {/* location, tags, committment */}

                <Box container justifyContent="center" spacing={3} sx={{mb:1, mt:3}}>
                  
                  <Grid container justifyContent="center" spacing={3} sx={{mt: 0, mb:1,}}>
                    
                    {/* location */}
                    <Box item>
                      <Typography sx={{color:"#212121", fontSize:"17px"}} variant="h6" >
                        Location:
                      </Typography>
                      <Box item width="120px" sx={{py:1, px:1, mx:3, border:"1px solid grey", borderRadius:1.5, overflow:"hidden", overflowX:"scroll"}}>
                        <Typography sx={{color:"#838383"}} align="center" variant="subtitle1" component="div">
                          {location}
                        </Typography>
                      </Box>
                    </Box>


                    {/* tag */}
                    <Box item>
                      <Typography sx={{color:"#212121", fontSize:"17px"}} variant="h6" >
                        Tag:
                      </Typography>
                      <Box item width="120px" sx={{py:1, px:1, mx:2, border:"1px solid grey", borderRadius:1.5, overflow:"hidden", overflowX:"scroll"}}>
                        <Typography sx={{color:"#838383"}} align="center" variant="subtitle1" component="div">
                          {tag}
                        </Typography>
                      </Box>
                    </Box>

                    {/* commitment */}
                    <Box item>
                      <Typography sx={{color:"#212121", fontSize:"17px"}} variant="h6" >
                        Commitment:
                      </Typography>
                      <Box item width="120px" sx={{py:1, px:1,mx:3, border:"1px solid grey", borderRadius:1.5, overflow:"hidden", overflowX:"scroll"}}>
                        <Typography sx={{color:"#838383"}} align="center" variant="subtitle1" component="div">
                          {commitment}
                        </Typography>
                      </Box>
                    </Box>
                  
                  </Grid>
                </Box>

              {/* delete button */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleOpen}
              >
                Delete Listing
              </Button>


              {/* Delete confirmation pop up */}
              <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...modalStyle, border: '2px solid pink', width: 400 }}>
                  <h2 id="child-modal-title">Are you sure you want to delete your listing?</h2>
                  <Button onClick={handleClose}>No, oops</Button>
                  <Button onClick={handleDelete}>Yes</Button>
                </Box>
              </Modal>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
