import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TagFilter() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tag</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="age"
          onChange={handleChange}
          size="sm"
        >
          <MenuItem value={10}>Coastal</MenuItem>
          <MenuItem value={20}>Marine</MenuItem>
          <MenuItem value={30}>Jungle</MenuItem>
          <MenuItem value={40}>Clean Energy</MenuItem>
          <MenuItem value={50}>Agriculture</MenuItem>
          <MenuItem value={60}>Recycling and Waste</MenuItem>
          <MenuItem value={70}>Other</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
