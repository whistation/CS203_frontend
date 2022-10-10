import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Listing({name, description}) {
  return (
    <Card variant="outlined" sx={{ width: 300, height: 350 }}>
      <CardMedia
        component="img"
        height="140"
        image="../assets/image_placeholder.png"
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
          <Button size="small">Apply </Button>
        {/* </Link> */}
      </CardActions>
    </Card>
  );
}
