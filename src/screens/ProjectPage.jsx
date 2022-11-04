import * as React from "react";
import "./General.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ApprovalIcon from "@mui/icons-material/Approval";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Component } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useLocation } from "react-router-dom";

//styling for the confirmation pop-up
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid lightgreen",
  boxShadow: 10,
  pt: 2,
  px: 4,
  pb: 3,
};

const theme = createTheme();

export default function ProjectPage({ route, navigation }) {
  // useEffect(() => {
  //   console.log(route.params);
  // }, []);

  const [listing, setListing] = useState({});
  const location = useLocation();

  useEffect(() => {
    //get listing id from route and call
    const listingId = location.state.listingId;

    const getListing = async (listingId) => {
      const res = await axios.get(
        `http://localhost:8080/listingpage/${listingId}`,
        {
          auth: {
            username: "admin@lendahand.com",
            password: "password",
          },
        }
      );
      setListing(res.data);
    };
    getListing(listingId);
  }, []);

  //  **get user
  //const getUser = async (userId) => {
  //   const res = await axios.get(`http://localhost:8080//user/${userId}`,
  //   {
  //     auth: {
  //       username: "admin@lendahand.com",
  //       password: "password",
  //     },
  //   });
  //   return res.data;
  // };
  const postApplication = async (userId, listingId) => {
    const Ipstateress = 0; //replace with your own ipstateress
    const res = await axios.post(
      "http://localhost:8080/listingpage/"+listingId+"/apply",
      {
        data: {
          message: "this is a test message",
        },
      },
      {
        params: {
          userId: userId,
        },
      },
      {
        auth: {
          username: "admin@lendahand.com",
          password: "password",
        },
      },
    );
  };

  const withdrawApplication = (userId) => {
    axios.delete("http://localhost:8080/listingpage/application/removal/" + userId,
    {auth: 
      {
        "username": "admin@lendahand.com",
        "password": "password"
      }
    }
    ).then((res) => {
      console.log("application deleted")
    })
  }

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(true);
  const handleSubmit = () => {
    setOpen(true);
    const userId = 1;
    const listingId = location.state.listingId;
    postApplication(userId, listingId);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/listingpage");
  };
  const testhandleSubmit = (event) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    const userId = 1;
    const listingId = location.state.listingId;
    postApplication(userId, listingId);
  };

  const handleWithdraw = () => {
    setOpen(true);
    setstate(false);
    const userId = localStorage.getItem("userid");
    withdrawApplication(userId);
  }

  const userid = localStorage.getItem("userid");
  
  return (
    <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", alignSelf: "center" }}>
            <ApprovalIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ alignSelf: "center" }}>
            Apply for a project
          </Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Project Title
          </Typography>

          <Typography variant="body" sx={{ mt: 1 }}>
            {listing.name}
          </Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Project description
          </Typography>

          <Typography variant="body" align="left" sx={{ mt: 1 }}>
            {listing.des}
          </Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            No. of Participants Required
          </Typography>

          <Typography variant="body" sx={{ mt: 1 }}>
            {listing.noOfParticipants}
          </Typography>


            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit() }
            >
              Apply
            </Button>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleWithdraw()}
            >
              Withdraw
            </Button>
          

          <Modal
            hideBackdrop
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...modalStyle, width: 400 }}>
              {state ? 
              <h2 id="child-modal-title">Successful application!</h2>
              :
              <h2 id="child-modal-title">Successful withdrawal!</h2>
              }
              <Button onClick={handleClose}>Great!</Button>
            </Box>
          </Modal>
        </Box>
      </Grid>
    </Grid>
  );
}
//<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//</Grid>
