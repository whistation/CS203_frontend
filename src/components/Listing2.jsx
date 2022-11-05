import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, setState } from "react";
import { Buffer } from "buffer";

import placeholder from "../assets/image_placeholder.png";
import bgrnd1 from "../assets/backgroundpic1.jpg";
import bgrnd2 from "../assets/backgroundpic2.jpg";
import bgrnd3 from "../assets/backgroundpic3.jpg";
import bgrnd4 from "../assets/backgroundpic4.jpg";
import bgrnd5 from "../assets/backgroundpic5.jpg";
import bgrnd6 from "../assets/backgroundpic6.jpg";
import bgrnd7 from "../assets/backgroundpic7.jpg";
import bgrnd8 from "../assets/backgroundpic8.jpg";

const bgrnds = [bgrnd1, bgrnd2, bgrnd3, bgrnd4, bgrnd5, bgrnd6, bgrnd7, bgrnd8];

function RandomBackground() {
  const [currentBgrndIndex, setCurrentBgrndIndex] = useState(
    Math.floor(Math.random() * bgrnds.length)
  );
  const changeBgrnd = () => {
    const randomNumber = Math.floor(Math.random() * bgrnds.length);
    setCurrentBgrndIndex(randomNumber);
    console.log(Math.random());
  };
  useEffect(() => changeBgrnd(), []);

  return bgrnds[currentBgrndIndex];
}

export default function Listing2({ 
  name, 
  description, 
  id, 
  buttonName,
  image,
  contentType,
}) {
  console.log(image);
  console.log(contentType);
  const [imageUrl, setImageUrl] = useState(placeholder);
  var urlcreated = false;
  var blob = new Blob([image], { type: contentType });
  console.log("this is returning image");
  console.log(image);

  var url = (URL || webkitURL).createObjectURL(blob);
  const substringUrl = url.substring(5);

  console.log("logging the url before substring");
  console.log(url);
  useEffect(() => {
    setImageUrl(substringUrl);
  }, []);

  //setImageUrl(url);
  console.log("logging the url after substring");
  console.log(substringUrl);

  urlcreated = true;

  console.log(urlcreated);

  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ width: 300, height: 370 }}>
      <CardMedia
        component="img"
        height="140"
        //image={RandomBackground()}
        //image={{imageUrl}}
        image={`url(${imageUrl})`}
        //image={`data:image/jpeg;base64,${image}`}
        alt="image placeholder"
      />
      {console.log("imageurl in return")}
      {console.log(imageUrl)}
      {/* <img src={`url(${imageUrl})`} alt="new" /> */}
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
        <Button
          size="small"
          onClick={() =>
            navigate("/listingpage/viewapplicants", {
              state: {
                listingId: id,
              },
            })
          }
        >
          {buttonName}{" "}
        </Button>
      </CardActions>
    </Card>
  );
}

//console.log(img);
//const encodedString = Buffer.from(`${img}`).toString('base64');
//const base64ToString = Buffer.from(encodedString, "base64").toString()
// var blob = new Blob([img], { type: "image/jpeg" });
// var imageUrl = URL.createObjectURL(blob);
// console.log(imageUrl);

// console.log(encodedString);
//console.log("a");
//  console.log(base64ToString);
// var [image, setImage] = useState("");
// useEffect(() => {
//   const getImage = async () => {
//     const res = await axios.get("http://localhost:8080/listingpage/1/image", {
//       auth: {
//         username: "admin@lendahand.com",
//         password: "password",
//       },
//     });
//     setImage(res.data);
//     console.log(res.data);
//   };
//   getImage();
// }, []);
//setImgURL("url(http://127.0.0.1:5173/14736884-2fd4-471f-85af-f1f0790271dc)");
