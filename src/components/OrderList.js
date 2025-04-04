import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Fade } from '@mui/material';
import { useSocket } from '../context/SocketContext';

const OrderList = () => {
  const { latestOrders } = useSocket();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order List
      </Typography>
      
      {/* Fade Component for smooth transition */}
      <Fade in={true} timeout={500}>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="order list table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>ID</strong></TableCell>
                <TableCell align="center"><strong>Recipe Name</strong></TableCell>
                <TableCell align="center"><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Date and Time</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell align="center">{order.id}</TableCell>
                  <TableCell align="center">{order.recipe_name}</TableCell>
                  <TableCell align="center">{order.status_name}</TableCell>
                  <TableCell align="center">{new Date(order.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fade>
    </Box>
  );
};

export default OrderList;
