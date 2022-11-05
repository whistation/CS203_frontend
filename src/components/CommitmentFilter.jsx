import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CommitmentFilter() {
  const [commitment, setCommitment] = React.useState('');

  const handleChange = (event) => {
    setCommitment(event.target.value);
  };

  return (
    <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Commitment</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={commitment}
          label="commitment"
          onChange={handleChange}
          size="sm"
        >
          <MenuItem value={10}>Ad Hoc</MenuItem>
          <MenuItem value={20}>1 Week</MenuItem>
          <MenuItem value={30}>1 Month</MenuItem>
          <MenuItem value={40}>3 Months</MenuItem>
          <MenuItem value={50}>6 Months</MenuItem>
          <MenuItem value={60}>1 Year</MenuItem>
          <MenuItem value={70}>Long-Term</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
