import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from "axios";
import { useLocation } from "react-router-dom";

import bgrnd1 from "../assets/backgroundpic1.jpg";
import bgrnd2 from "../assets/backgroundpic2.jpg";
import bgrnd3 from "../assets/backgroundpic3.jpg";
import bgrnd4 from "../assets/backgroundpic4.jpg";
import bgrnd5 from "../assets/backgroundpic5.jpg";
import bgrnd6 from "../assets/backgroundpic6.jpg";
import bgrnd7 from "../assets/backgroundpic7.jpg";
import bgrnd8 from "../assets/backgroundpic8.jpg";

const bgrnds = [
  bgrnd1, bgrnd2, bgrnd3, bgrnd4, bgrnd5, bgrnd6, bgrnd7, bgrnd8
]

function RandomBackground() {
  const [currentBgrndIndex, setCurrentBgrndIndex] = useState(Math.floor(Math.random() * bgrnds.length))
  const changeBgrnd = () => {
    const randomNumber = Math.floor(Math.random() * bgrnds.length);
    setCurrentBgrndIndex(randomNumber);
    console.log(Math.random());
  }
  useEffect(() => changeBgrnd(), [])

  return (
    bgrnds[currentBgrndIndex]
  )
}

//popup style h
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

export default function Listing({ name, description, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleWithdraw = () => {
    setOpen(true)
    
  };

  return (
    <Card variant="outlined" sx={{ width: 300, height: 350 }}>
      <CardMedia
        component="img"
        height="140"
        image={RandomBackground()}
        alt="image placeholder"
      />
      <CardContent sx={{ textAlign: "left" }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {/* <Button size="small">Share</Button> */}
        {/* <Link to="/listingpage/projectpage"> */}
        <Button size="small" onClick={() => navigate("/listingpage/projectpage", {
          state: {
            listingId: id,
          }
        })} >View project
        </Button>
        {/* </Link> */}
      </CardActions >
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="small" onClick={handleOpen} >
          Withdraw
        </Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
        >
          <Box sx={{ ...modalStyle, width: 400 }}>
            <h2> Confirm withdrawal?</h2>
            <Button onClick={handleClose}>
              Yes
            </Button>
            <Button onClick={handleClose} alignItems="flex-end">
              No
            </Button>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
}
