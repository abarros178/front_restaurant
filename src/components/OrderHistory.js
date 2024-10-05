import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const OrderHistory = ({ orderId, dishName, buy }) => (
  <Box sx={{ mb: 3, backgroundColor: '#f5f5f5', p: 2, borderRadius: '8px' }}>
    <Typography variant="h6" gutterBottom color="primary">
      Order History #{orderId}
    </Typography>
    <Typography variant="body2" paragraph>
      For order #{orderId}, assigned to the dish "{dishName}":
    </Typography>
    {buy && buy.length > 0 ? (
      <>
        <Typography variant="body2" paragraph>
          The following ingredients were purchased to complete the dish preparation:
        </Typography>
        <List dense>
          {buy.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.name_ingredient}: ${item.quantity_buy} ${item.quantity_buy > 1 ? 'units' : 'unit'}`}
              />
            </ListItem>
          ))}
        </List>
      </>
    ) : (
      <Typography variant="body2">
        All necessary ingredients were available for the preparation of this dish.
      </Typography>
    )}
  </Box>
);

export default OrderHistory;