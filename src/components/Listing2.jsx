import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, setState } from "react";
import Box from "@mui/material/Box";
import placeholder from "../assets/image_placeholder.png";



export default function Listing2({ 
  name, 
  description, 
  id, 
  buttonName,
  imageUrl,
}) {

  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ width: 300, height: 370 }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt="image"
      />

      {/* <img src={`url(${imageUrl})`} alt="new" /> */}
      <CardContent sx={{ textAlign: "left" }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Box width="265px" height="93px" sx={{border:"1px solid grey", borderRadius:1.5, overflow:"hidden", py:1, px:1}}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>

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
