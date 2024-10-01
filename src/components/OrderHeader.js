import React from 'react';
import { Typography, Box } from '@mui/material';

const OrderHeader = ({ orderId }) => (
  <Box>
    <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
      Orden #{orderId}
    </Typography>
    <Typography variant="subtitle1" gutterBottom color="text.secondary">
      Te encuentras en el detalle de la orden #{orderId}. Aquí podrás ver los diferentes estados de preparación y la asignación del plato.
    </Typography>
  </Box>
);

export default OrderHeader;
