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
import placeholder from '../assets/image_placeholder.png';

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

export default function ProjectPage() {

  //get the userId
  const userId = localStorage.getItem("userid");
  console.log(userId);

  //storing the listing and listing details
  const [listing, setListing] = useState([]);
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const location = useLocation();
  const listingId = location.state.listingId;

  //variable to set the imageurl for the picture
  const [imageurl, setImageurl] = useState(placeholder);

  useEffect(() => {
    //get listing id from route and call
    const getListing = async (listingId) => {
      axios.get(
        `http://localhost:8080/listingpage/${listingId}`,
        {
          auth: {
            username: "admin@lendahand.com",
            password: "password",
          },
        }
      ).then((response) => {
        setListing(response.data);
        setTag(response.data.tag.value);
        setName("" + response.data.lister.firstname + " " + response.data.lister.lastname);
        console.log("get listing details success", response);

      }, (error) => {
        console.log("failed to get listing details", error)
      });
    };
    getListing(listingId);


    //api call to get the image 
    axios.get("http://localhost:8080/listingpage/" + listingId + "/image",
      {
        responseType: "arraybuffer"
      }
    ).then((res) => {
      console.log("successfully got the image");
      console.log(res);
      // console.log(res.headers.get("content-type"));

      const imagedata = res.data;
      const contenttype = res.headers.get("content-type");

      // console.log(imagedata);
      // console.log(contenttype);

      var blob = new Blob([imagedata], { type: contenttype });
      console.log(imagedata)

      var url = (URL || webkitURL).createObjectURL(blob);
      const substringurl = url.substring(5);

      console.log("logging the url before substring");
      console.log(url);

      setImageurl(url);
      console.log("logging the url after substring");
      console.log(substringurl);

    }, (error) => {
      console.log("image get failed");
      console.log(error);
    })

  }, []);

  //get the applicationid
  var [appId, setAppId] = useState([]);
  var [appStatus, setAppStatus] = useState([]);
  useEffect(() => {
    const getAppId = async () => {
      const aid = await axios.get(
        "http://localhost:8080/user/applications?userId=" + userId +
        "&listingId=" + listingId,
        {
          auth:
          {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
          }
        },
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Content-Type': 'application/json',
          }
        }
      );
      console.log("appid", aid.data);
      setAppStatus(aid.data);
      setAppId((aid.data)[0].id);
    }
    getAppId();
  }, []);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(true);

  const handleSubmit = () => {
    axios.post(
      "http://localhost:8080/listingpage/" + listingId + "/newapplication?userId=" + userId,
      {
        "message": "string"
      },
      {
        auth: {
          username: "admin@lendahand.com",
          password: "password",
        },
      },
    ).then((response) => {
      console.log("post application success!", response);
      setOpen(true);
    }, (error) => {
      console.log("post application failed!", error);
    });
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/listingpage");
  };

  const handleWithdraw = () => {
    axios.delete("http://localhost:8080/listingpage/application/removal/" + appId,
      {
        auth:
        {
          "username": "admin@lendahand.com",
          "password": "password"
        }
      }
    ).then((res) => {
      console.log("application deleted", res);
      setState(false);
      setOpen(true);
    }, (err) => {
      console.log("failed to delete application", err)
    })
  }

  return (
    <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
      <CssBaseline />


      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${imageurl})`,
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
            my: 4,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", alignSelf: "center" }}>
            <ApprovalIcon />
          </Avatar>

          <Typography component="h1" variant="h4" sx={{ alignSelf: "center" }}>
            Apply for a project
          </Typography>

          <Box
            noValidate
            sx={{ mt: 2 }}
          >
            {/* project owner's name */}
            <Typography sx={{ color: "#212121", ml: 0.5, mt: 1 }} align="left" variant="h6" component="div">
              Project Owner
            </Typography>
            <Box
              width="535px"
              sx={{ py: 1, px: 1, border: "1px solid grey", borderRadius: 1.5, overflow: "hidden", overflowX: "scroll" }}>
              <Typography sx={{ color: "#838383" }} align="left" variant="subtitle1" component="div">
                {name}
              </Typography>
            </Box>

            {/* project title field */}
            <Typography sx={{ color: "#212121", ml: 0.5, mt: 2 }} align="left" variant="h6" component="div">
              Project Title
            </Typography>
            <Box
              width="535px"
              sx={{ py: 1, px: 1, border: "1px solid grey", borderRadius: 1.5, overflow: "hidden", overflowX: "scroll" }}>
              <Typography sx={{ color: "#838383" }} align="left" variant="subtitle1" component="div">
                {listing.name}
              </Typography>
            </Box>

            {/* project description field */}
            <Typography sx={{ color: "#212121", ml: 0.5, mt: 2 }} align="left" variant="h6" component="div">
              Project description
            </Typography>
            <Box
              width="535px"
              height="120px"
              sx={{ py: 1, px: 1, border: "1px solid grey", borderRadius: 1.5, overflow: "hidden", overflowX: "scroll", overflowY: "scroll", display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#838383" }} align="left" variant="subtitle1" component="div">
                {listing.des}
              </Typography>
            </Box>


            {/* location, tags, committment */}
            <Box container justifyContent="center" spacing={3} sx={{ mb: 1, mt: 3 }}>
              <Grid container justifyContent="center" spacing={3} sx={{ mt: 0, mb: 1, }}>

                {/* location */}
                <Box item>
                  <Typography sx={{ color: "#212121", fontSize: "17px" }} variant="h6" >
                    Location:
                  </Typography>
                  <Box item width="120px" sx={{ py: 1, px: 1, mx: 3, border: "1px solid grey", borderRadius: 1.5, overflow: "hidden", overflowX: "scroll" }}>
                    <Typography sx={{ color: "#838383" }} align="center" variant="subtitle1" component="div">
                      {listing.location}
                    </Typography>
                  </Box>
                </Box>

                {/* tag */}
                <Box item>
                  <Typography sx={{ color: "#212121", fontSize: "17px" }} variant="h6" >
                    Tag:
                  </Typography>
                  <Box item width="120px" sx={{ py: 1, px: 1, mx: 2, border: "1px solid grey", borderRadius: 1.5, overflow: "hidden", overflowX: "scroll" }}>
                    <Typography sx={{ color: "#838383" }} align="center" variant="subtitle1" component="div">
                      {/* {listing.tag.value} */}
                      {tag}
                    </Typography>
                  </Box>
                </Box>

                {/* commitment */}
                <Box item>
                  <Typography sx={{ color: "#212121", fontSize: "17px" }} variant="h6" >
                    Commitment:
                  </Typography>
                  <Box item width="120px" sx={{ py: 1, px: 1, mx: 3, border: "1px solid grey", borderRadius: 1.5, overflow: "hidden", overflowX: "scroll" }}>
                    <Typography sx={{ color: "#838383" }} align="center" variant="subtitle1" component="div">
                      {listing.commitment}
                    </Typography>
                  </Box>
                </Box>

              </Grid>
            </Box>
          </Box>

          {appStatus.length == 0 ?
            // apply button
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
            >
              Apply
            </Button>
            :
            //withdraw button
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleWithdraw()}
            >
              Withdraw
            </Button>
          }


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

