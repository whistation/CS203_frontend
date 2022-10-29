import * as React from "react";
import {Link} from "react-router-dom";
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
import {useState, useEffect} from "react";
import Modal from '@mui/material/Modal';
import {useNavigate} from "react-router-dom";


import bgrnd1 from "../assets/backgroundpic1.jpg";
import bgrnd2 from "../assets/backgroundpic2.jpg";
import bgrnd3 from "../assets/backgroundpic3.jpg";
import bgrnd4 from "../assets/backgroundpic4.jpg";
import bgrnd5 from "../assets/backgroundpic5.jpg";
import bgrnd6 from "../assets/backgroundpic6.jpg";
import bgrnd7 from "../assets/backgroundpic7.jpg";
import bgrnd8 from "../assets/backgroundpic8.jpg";
import { ConstructionOutlined } from "@mui/icons-material";


//Everything related to the Add Image button
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

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
export default function CreateListing() {

  const [pictureURL, setPictureURL] = useState(placeholder);
  console.log(pictureURL);
  const handleUpload = (e) => {
    setPictureURL(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/listingpage/mylistings");
  };
  const handleClose2 = () => {
    setOpen(false);
    navigate("/listingpage/createlisting");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', width: '100vw'}}>
        <CssBaseline />
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <ImageButton
            focusRipple
            style={{
              width: "100%"
            }}
            variant="contained" 
            component="label"

          >
            <input hidden accept="image/*" multiple type="file" onChange={handleUpload}/>
            <ImageSrc style={{ backgroundImage: `url(${pictureURL})` }}/>
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                Add an image of your project!
                
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </Grid>
    
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AddBoxIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Create New Listing
            </Typography>

            <Box noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                autoFocus
                margin="normal"
                required
                fullWidth
                id="title"
                label="Project Title"
                name="title"
                autoComplete="title"
                helperText="Enter a title for your project."
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Project Description"
                type="description"
                id="description"
                autoComplete="description"
                multiline={true}
                inputProps={{maxLength: 750}}
                helperText="Describe the project, and the kind of volunteers you are seeking."
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=>handleOpen()}
              >
                Create
              </Button>

              <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...modalStyle, width: 400 }}>
                  <h2 id="child-modal-title">Confirm creation?</h2>
                  <Button onClick={handleClose}>Yes!</Button>
                  <Button onClick={handleClose2}>No!</Button>
                </Box>
              </Modal>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}