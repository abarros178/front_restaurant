import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const orders = [
  { id: 6, time: '5:48 PM', date: 'Sep 28', status: 'En preparación' },
  { id: 5, time: '5:42 PM', date: 'Sep 28', status: 'Completada' },
];

const Orders = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Listado de Órdenes
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText
              primary={`Orden #${order.id}`}
              secondary={`${order.time} - ${order.date} - ${order.status}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Orders;
