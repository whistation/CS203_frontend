import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlatList from "flatlist-react";

import Listing from "./Listing";

const drawerWidth = 240;

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

export default function ListingPage2() {
  //const dataSource = ["Project Title 1", "Project Title 2"];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        marginLeft: 30,
        marginTop: 6,
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{ background: "white" }}>
          <SearchBar />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          {" "}
          <Typography
            variant="h6"
            sx={{ marginTop: 1.5, marginBottom: 1.5}}
          >
            Filters
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {["Location", "Theme", "Date", "Others"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 1.5 }}>
        Results:
      </Typography>
      <Box
        component="main"
        sx={{
          width: 1000,
          height: 400,
          bgcolor: "white",
          textAlign: "left",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* <FlatList
        data={dataSource}
        renderItem={({ item }) => (<Listing input={item}/>)}
        //Setting the number of column
        numColumns={3}
      /> */}
        <Listing />
        <Box sx={{ width: 30 }} />
        <Listing />
        <Box sx={{ width: 30 }} />
        <Listing />
      </Box>
      <Box
        component="main"
        sx={{
          width: 1000,
          height: 400,
          bgcolor: "white",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Listing />
        <Box sx={{ width: 30 }} />
        <Listing />
        <Box sx={{ width: 30 }} />
        <Listing />
      </Box>
    </Box>
  );
}
