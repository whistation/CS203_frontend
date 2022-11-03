import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

import placeholder from "../assets/image_placeholder.png";
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
    const randomNumber = Math.floor(Math.random()*bgrnds.length);
    setCurrentBgrndIndex(randomNumber);
    console.log(Math.random());
  }
  useEffect(() => changeBgrnd(), [])

  return (
    bgrnds[currentBgrndIndex]
  )
}

export default function Listing({name, description, id, buttonName, img}) {
  const navigate = useNavigate();
  console.log("Is img a string?");
  console.log(img);
  return (
    <Card variant="outlined" sx={{ width: 300, height: 370 }}>
      <CardMedia
        component="img"
        height="140"
        image= {img}
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
          <Button size="small" onClick={() => navigate("/listingpage/projectpage", {
            state: {
						listingId: id,
            }
					})} >{buttonName} </Button>
      </CardActions>
    </Card>
  );
}
