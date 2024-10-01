import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KitchenIcon from '@mui/icons-material/Kitchen';
import EggIcon from '@mui/icons-material/Egg';

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

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
}));

const IngredientsList = ({ ingredients }) => (
  <StyledCard>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <KitchenIcon color="primary" fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="h5" component="div" gutterBottom>
          Ingredientes
        </Typography>
      </Box>
      <List disablePadding>
        {ingredients.map((ingredient, index) => (
          <React.Fragment key={index}>
            <StyledListItem>
              <ListItemIcon>
                <EggIcon color="action" />
              </ListItemIcon>
              <ListItemText
                primary={ingredient.name}
                secondary={`${ingredient.quantity} unit`}
                primaryTypographyProps={{ fontWeight: 'medium' }}
              />
            </StyledListItem>
            {index < ingredients.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </CardContent>
  </StyledCard>
);

export default IngredientsList;