import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LocationFilter() {
  const [location, setLocation] = React.useState('');

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          label="location"
          onChange={handleChange}
          size="sm"
        >
          <MenuItem value={10}>North</MenuItem>
          <MenuItem value={20}>South</MenuItem>
          <MenuItem value={30}>East</MenuItem>
          <MenuItem value={40}>West</MenuItem>
          <MenuItem value={50}>Central</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
