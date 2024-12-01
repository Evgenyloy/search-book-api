import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './select.scss';

interface IBasicSelect {
  [key: string]: string[];
}

export const BasicSelect: React.FC<IBasicSelect> = ({ args }) => {
  const [categories, setCategories] = React.useState('1');

  const handleChange = (event: SelectChangeEvent) => {
    setCategories(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth sx={{ width: 150 }}>
        <Select
          sx={{ height: '30px' }}
          labelId="demo-simple-select-label"
          value={categories}
          onChange={handleChange}
        >
          <MenuItem value={1}>{args[0]}</MenuItem>
          <MenuItem value={2}>{args[1]}</MenuItem>
          {args[2] && <MenuItem value={3}>{args[2]}</MenuItem>}
          {args[3] && <MenuItem value={4}>{args[3]}</MenuItem>}
          {args[4] && <MenuItem value={5}>{args[4]}</MenuItem>}
          {args[5] && <MenuItem value={6}>{args[5]}</MenuItem>}
          {args[6] && <MenuItem value={7}>{args[6]}</MenuItem>}
        </Select>
      </FormControl>
    </Box>
  );
};
