import React from 'react';
import { Box, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const OrderSearchBar = ({ searchTerm, onSearchChange }) => (
  <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
    <TextField
      variant="outlined"
      placeholder="Search orders..."
      size="small"
      value={searchTerm}
      onChange={onSearchChange}
      InputProps={{
        startAdornment: <SearchIcon color="action" />,
      }}
      sx={{ mr: 2, flexGrow: 1 }}
    />
  </Box>
);

export default OrderSearchBar;