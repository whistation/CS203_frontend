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
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import {useState} from "react";
import Modal from '@mui/material/Modal';
import {useNavigate} from "react-router-dom";
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

  const handleDelete = () => {
    console.log("handle delete");
  };

  //code to set the project title, description, location, tag, commitment displayed
  const [title, setTitle] = useState("Project title");
  const [description, setDescription] = useState("Project description");
  const [location, setLocation] = useState("Location");
  const [tag, setTag] = useState("Tag");
  const [commitment, setCommitment] = useState("Commitment");

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
            backgroundImage: `url(${placeholder})`
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
              sx={{py:1, px:1, border:"1px solid grey", borderRadius:1.5, overflow:"hidden", overflowX:"scroll"}}>
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


              {/* Confirmation pop up */}
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
