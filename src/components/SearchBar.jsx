import TextField from "@mui/material/TextField";
import * as React from "react";

const SearchBar = () => (
    <form>
      <TextField
        id="search-bar"
        className="text"
        label="Search"
        variant="outlined"
        placeholder="Project Title..."
        size="small"
        sx={{
          width: 975,
        }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );

export default SearchBar;