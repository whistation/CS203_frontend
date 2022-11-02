import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

export default function SearchBar() {
  return (
    <form >
      <TextField
        id="search-bar"
        className="text"
        label="Search"
        variant="outlined"
        placeholder="Project Title..."
        size="small"
        sx={{
          width: "92vw",
        }}

      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );
}
