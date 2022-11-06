import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TagFilter() {
  const [tag, setTag] = React.useState("");

  const handleTag = (event) => {
    setTag(event.target.value);
    console.log(tag);
  }

  return (
    <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Tag</InputLabel>
        <Select
          labelId="tag"
          id="tag"
          value={tag}
          label="tag"
          onChange={handleTag}
        >
          <MenuItem value={"Coastal"}>Coastal</MenuItem>
          <MenuItem value={"Marine"}>Marine</MenuItem>
          <MenuItem value={"Jungle"}>Jungle</MenuItem>
          <MenuItem value={"Clean Energy"}>Clean Energy</MenuItem>
          <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
          <MenuItem value={"Recycling and Waste"}>Recycling and Waste</MenuItem>
          <MenuItem value={"Others"}>Others</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
