import * as React from "react";
import "./General.css";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ApprovalIcon from '@mui/icons-material/Approval';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Modal from '@mui/material/Modal';

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

const theme = createTheme();

export default function ProjectPage(){

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
    navigate("/listingpage");
  };

  return(
      <Grid container component="main" sx={{ height: '100vh', width:'100vw' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
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
              <ApprovalIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Apply for a project
            </Typography>

          <Typography alignSelf="left" variant="h6" sx={{ mt: 3 }}>
            Project Title
          </Typography>

          <Typography variant="body" sx={{ mt: 1 }}>
            This is the project title
          </Typography>

          <Typography alignSelf="left" variant="h6" sx={{ mt: 3 }}>
            Project description
          </Typography>

          <Typography variant="body" sx={{ mt: 1 }}>
            This is the project description
          </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleOpen()}
            >
                Apply
            </Button>

            <Modal
              hideBackdrop
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...modalStyle, width: 400 }}>
                <h2 id="child-modal-title">Successful application!</h2>
                <Button onClick={handleClose}>Great!</Button>
              </Box>
            </Modal>

              </Box>

        </Grid>
      </Grid>
  )
}