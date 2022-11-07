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

export default function CreatedListing({
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

      <CardContent sx={{ textAlign: "left" }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Box width="265px" height="93px" sx={{ border: "1px solid lightgrey", borderRadius: 1.5, overflow: "hidden", py: 1, px: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>

      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          size="small"
          onClick={() =>
            navigate("/listingpage/projectpage", {
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
