import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LocationSelect() {
  const [location, setLocation] = React.useState('');

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="location"
          id="location"
          value={location}
          label="location"
          onChange={handleLocation}
        >
          <MenuItem value={"north"}>North</MenuItem>
          <MenuItem value={"south"}>South</MenuItem>
          <MenuItem value={"east"}>East</MenuItem>
          <MenuItem value={"west"}>West</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
