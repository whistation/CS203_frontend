import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';
import axios from "axios";
import { Typography } from 'antd';
import {useState, useEffect} from "react";
import { render } from 'less';

export default function PinnedSubheaderList() {
  const [people, setPeople] = useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:8080/listingpage/" + 14, //need to pass in the relevant listingid in this url 
    {auth: 
      {
        "username": "admin@lendahand.com",
        "password": "password"
      }
    }
    ).then((response) => {
      var applicants = [];
      var applications = [];
      applications = response.data.applications;

      applications.map((data, index) => {
        applicants[index] = data.applicant;
      })

      setPeople(applicants);      

    }, (error) => {
      console.log("unsuccessful get of applicant data");
      console.log(error);
    });

  }, [])

  return (
    <Box sx={{border:"1px solid grey", backgroundColor:"blue"}}>
      <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}>
        {people.map((value, index) => (
          <ListItem
            key={index}
          >
            {/* <Typography>
              
            </Typography> */}
            <ListItemText primary={`Name: ${value.firstname} ${value.lastname}`} secondary={`ContactNo: ${value.contactNo}`} />
          </ListItem>
        ))}
      </List>
    </Box>

  );

}
