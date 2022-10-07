import * as React from "react";
import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

import bgrnd1 from "../assets/backgroundpic1.jpg";
import bgrnd2 from "../assets/backgroundpic2.jpg";
import bgrnd3 from "../assets/backgroundpic3.jpg";
import bgrnd4 from "../assets/backgroundpic4.jpg";
import bgrnd5 from "../assets/backgroundpic5.jpg";
import bgrnd6 from "../assets/backgroundpic6.jpg";
import bgrnd7 from "../assets/backgroundpic7.jpg";
import bgrnd8 from "../assets/backgroundpic8.jpg";


//Everything related to the Add Image button
const bgrnds = [
  bgrnd1, bgrnd2, bgrnd3, bgrnd4, bgrnd5, bgrnd6, bgrnd7, bgrnd8
]

function RandomBackground() {
  const [currentBgrndIndex, setCurrentBgrndIndex] = useState(Math.floor(Math.random() * bgrnds.length))
  const changeBgrnd = () => {
    const randomNumber = Math.floor(Math.random()*bgrnds.length);
    setCurrentBgrndIndex(randomNumber);
    console.log(Math.random());
  }
  useEffect(() => changeBgrnd(), [])

  return (
    bgrnds[currentBgrndIndex]
  )
}

const images = [
  {
    url: placeholder,
    title: 'Add an image of your project!',
    width: '100%',
    height: '100%',
  },
];

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

//exporting the actual app!
export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            // backgroundImage: `url(${placeholder})`,
            // backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${RandomBackground()})` }} />
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
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
      ))}
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

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                inputProps={{maxlength: 750}}
                helperText="Describe the project, and the kind of volunteers you are seeking."
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}