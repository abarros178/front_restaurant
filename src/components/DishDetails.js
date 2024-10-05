import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import KitchenIcon from '@mui/icons-material/Kitchen';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const DishDetails = ({ orderId, dish }) => (
  <StyledCard>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <RestaurantMenuIcon color="primary" fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="h5" component="div" gutterBottom>
        Order plate #{orderId}
        </Typography>
      </Box>
      <Typography variant="h6" color="primary" gutterBottom>
        {dish.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {dish.description}
      </Typography>
      <Chip
        icon={<KitchenIcon />}
        label="Preparation time: 15 minutes"
        color="primary"
        variant="outlined"
      />
    </CardContent>
  </StyledCard>
);

export default DishDetails;