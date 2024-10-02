import React from 'react';
import { Typography, Box } from '@mui/material';

const OrderHeader = ({ orderId }) => (
  <Box>
    <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
      Order #{orderId}
    </Typography>
    <Typography variant="subtitle1" gutterBottom color="text.secondary">
      You are viewing the details for order #{orderId}. Here you can see the different preparation statuses and the assignment of the dish.
    </Typography>
  </Box>
);

export default OrderHeader;
