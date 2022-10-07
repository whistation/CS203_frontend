import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Listing(input) {
  const title = input;
  return (
    <Card variant="outlined" sx={{ width: 300, height: 325 }}>
      <CardMedia
        component="img"
        height="140"
        image="/assets/image_placeholder.png"
        alt="image placeholder"
      />
      <CardContent sx={{ textAlign: "left" }}>
        <Typography gutterBottom variant="h5" component="div">
          Project Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a brief description of the project. Not all details need to be
          here. Just the important bits.
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {/* <Button size="small">Share</Button> */}
        {/* <Link to="/listingpage/projectpage"> */}
          <Button size="small">Apply </Button>
        {/* </Link> */}
      </CardActions>
    </Card>
  );
}
