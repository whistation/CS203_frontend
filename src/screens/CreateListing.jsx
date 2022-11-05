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
import imageCompression from 'browser-image-compression'; 

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

    //code to handle image upload
    const [pictureURL, setPictureURL] = useState(placeholder);

    const image = new FormData();
    const [picture, setPicture] = useState(null);
  
      async function handleUpload(e){
      setPictureURL(URL.createObjectURL(e.target.files[0]));
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      const imageFile = e.target.files[0];
      setPicture(imageFile);
      // console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true

      // try {
      //   const compressedFile = await imageCompression(imageFile, options);
      //   console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      //   console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      console.log(`original file size ${imageFile.size / 1024 / 1024} MB`)
     
      //   setPicture(compressedFile); 

      // } catch (error) {
      //   console.log(error);
      // }

      // const compressedImage = imageCompression(e.target.files[0], options);
      // var file = new File([compressedImage], "file");
      // setPicture(file);
    }
    image.append("image", picture);
    console.log("The picture in image formdata", image.get("image"));

  

  //project title and description data
  const [data, setData] = useState(0);

  //project location data
  const [location, setLocation] = useState('');
  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  //project tag data
  const [tag, setTag] = React.useState('');
  const handleTag = (event) => {
    setTag(event.target.value);
  };

  //project commitment length data
  const [commitment, setCommitment] = React.useState('');
  const handleCommitment = (event) => {
    setCommitment(event.target.value);
  };

  //This code fires when the user confirms that they want to create a listing
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (event) => {
    event.preventDefault();
    setData(new FormData(event.currentTarget));

    //verify that the fields are not empty
    if (
      pictureURL==="/src/assets/image_placeholder.png" | 
      location.length===0 | tag.length===0 
        | commitment.length===0 | data.get('title').length===0 | data.get('description').length===0) {
      console.log("some fields are empty!");
      handleBlankOpen();
    } else {
      setOpen(true);
    }
  };

  //user authentication details
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  //fires when user confirms listing creation
  const userid = localStorage.getItem("userid");
  const handleConfirm = () => {
    console.log({
      name: data.get('title'),
      des: data.get('description'),
      location: location,
      tag: tag,
      commitment: commitment,
    });

    //axios post call for listing details
      axios.post("http://localhost:8080/listingpage/newlisting?userId=" + userid + "&tagName=" + tag,
      {
        "name": data.get('title'),
        "des": data.get('description'),
        "commitment": commitment,
        "location": location
      },
      {
        auth: 
        {
          "username": username,
          "password": password
        }
      }
      )
      .then((response) => {
        console.log("axios post details success");
        console.log(response);

        //axios post call for image upload
        const listingid = response.data.id
        console.log(response.data.id);
        console.log("here is the image");
        console.log(image);
        console.log(image.get("image"));

        axios.post('http://127.0.0.1:8080/listingpage/newlisting/imageupload?id=' + listingid, 
          image, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Basic YWRtaW5AbGVuZGFoYW5kLmNvbTpwYXNzd29yZA==', 
              'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
            }
          }
        ).then((response) => {

          console.log("axios post image success");
          console.log(response);
          setOpen(false);
          navigate("/listingpage/mylistings");
          
        }
        ).catch(function(error) {
          if (error.response.status == 500) {
            
            //if the image posting is not successful, delete the listing details that have been posted before the listing image
            axios.delete("http://localhost:8080/listingpage/removal/" + listingid, 
            {auth: 
              {
                "username": "admin@lendahand.com",
                "password": "password"
              }
            }
            ).then((res) => {
              console.log("successful deletion!");
              console.log(res);
              handleClose();
              navigate("/listingpage/mylistings");
        
            }, (error) => {
              console.log("unsuccessful deletion");
              console.log(error);
            });

            //after deleting, close the confirmation pop up and open the error pop up
            handleCancel();
            handleErrorOpen();
          }
        })


      }, (error) => {
        console.log("axios post details fail");
        console.log(error);
      });


  };

  //this code fires when the user clicks cancel on the confirmation pop up
  const handleCancel = () => {
    setOpen(false);
    navigate("/listingpage/createlisting");
  };

  //code to handle opening and closing of the please do not leave blank pop-up
  const [blankOpen, setBlankOpen] = useState(false);
  const handleBlankOpen = () => {
    setBlankOpen(true);
  };
  const handleBlankClose = () => {
    setBlankOpen(false);
  };

  //code to handle opening and closing of the 500 error pop up
  const [errorOpen, setErrorOpen] = useState(false);
  const handleErrorOpen = () => {
    setErrorOpen(true);
  };
  const handleErrorClose = () => {
    setErrorOpen(false);
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
          {/* upload image button */}
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
    
        <Grid 
          item 
          xs={12} 
          sm={8} 
          md={5} 
          component={Paper} 
          elevation={6} 
          square>
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

            <Box 
              component="form" 
              noValidate 
              onSubmit={handleOpen} 
              sx={{ mt: 1}} >
              {/* Project title field */}
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

              {/* Project description field */}
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
                maxRows={5}
                helperText="Describe the project, and the kind of volunteers you are seeking. (Max 750 characters)"
              />

              <Grid container justifyContent="center" spacing={3} sx={{mt: 0, mb:1}}>
                
                {/* location select */}
                <Grid item>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Location</InputLabel>
                          <Select
                            labelId="location"
                            id="location"
                            value={location}
                            label="location"
                            onChange={handleLocation}
                          >
                            <MenuItem value={"north"}>North</MenuItem>
                            <MenuItem value={"south"}>South</MenuItem>
                            <MenuItem value={"east"}>East</MenuItem>
                            <MenuItem value={"west"}>West</MenuItem> 
                          </Select>
                        </FormControl>
                      </Box>
                </Grid>

                {/* tag select */}
                <Grid item>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel>Tag</InputLabel>
                          <Select
                            labelId="tag"
                            id="tag"
                            value={tag}
                            label="tag"
                            onChange={handleTag}
                          >
                            <MenuItem value={"Coastal"}>Coastal</MenuItem>
                            <MenuItem value={"Marine"}>Marine</MenuItem>
                            <MenuItem value={"Jungle"}>Jungle</MenuItem>
                            <MenuItem value={"Clean Energy"}>Clean Energy</MenuItem> 
                            <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
                            <MenuItem value={"Recycling and Waste"}>Recycling and Waste</MenuItem>
                            <MenuItem value={"Others"}>Others</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                </Grid>

                {/* commitment select */}
                <Grid item>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel>Time</InputLabel>
                          <Select
                            labelId="commitment"
                            id="commitment"
                            value={commitment}
                            label="commitment"
                            onChange={handleCommitment}
                          >
                            <MenuItem value={"ad-hoc"}>Ad-Hoc</MenuItem>
                            <MenuItem value={"1 week"}>1 week</MenuItem>
                            <MenuItem value={"1 month"}>1 month</MenuItem>
                            <MenuItem value={"3 months"}>3 months</MenuItem> 
                            <MenuItem value={"6 months"}>6 months</MenuItem>
                            <MenuItem value={"1 year"}>1 year</MenuItem>
                            <MenuItem value={"long-term"}>Long-Term</MenuItem> 
                          </Select>
                        </FormControl>
                      </Box>
                </Grid>
              </Grid>


              {/* create button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>

              {/* confirmation pop up */}
              <Modal
                hideBackdrop
                open={open}
                onClose={handleConfirm}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...modalStyle, width: 400 }}>
                  <h2 id="child-modal-title">Confirm creation?</h2>
                  <Button onClick={handleConfirm}>Yes!</Button>
                  <Button onClick={handleCancel}>No!</Button>
                </Box>
              </Modal>

              {/* Please do not leave fields blank pop up */}
              <Modal
                hideBackdrop
                open={blankOpen}
                onClose={handleBlankClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...modalStyle, border: '2px solid pink', width: 400 }}>
                  <h2 id="child-modal-title">Remember to add an image, and do not leave any fields blank!</h2>
                  <Button onClick={handleBlankClose}>Got it!</Button>
                </Box>
              </Modal>

              <Modal
                hideBackdrop
                open={errorOpen}
                onClose={handleErrorClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...modalStyle, border: '2px solid pink', width: 400 }}>
                  <h2 id="child-modal-title">We have trouble uploading ur image to the server, try giving us a smaller one please!</h2>
                  <Button onClick={handleErrorClose}>Got it!</Button>
                </Box>
              </Modal>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
