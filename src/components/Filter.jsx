import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Filter({ name }) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="age"
          onChange={handleChange}
          size="sm"
        >
          <MenuItem value={10}>placeholder 1</MenuItem>
          <MenuItem value={20}>placeholder 2</MenuItem>
          <MenuItem value={30}>placeholder 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
