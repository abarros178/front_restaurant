import React from 'react';
import { Card, CardContent, Box, Typography, List, ListItem, ListItemText, Chip, useTheme } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const RecipeCard = React.memo(({ recipe }) => {
  const theme = useTheme();

  return (
    <Card 
      elevation={3} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: 2, 
        boxShadow: `0 4px 15px ${theme.palette.primary.light}22`, // Sombra con color primario
        transition: 'transform 0.3s, box-shadow 0.3s', // Transición al hover
        '&:hover': {
          transform: 'translateY(-5px)', // Efecto hover
          boxShadow: `0 6px 20px ${theme.palette.primary.light}33`, // Sombra más pronunciada al hover
        },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <RestaurantMenuIcon sx={{ color: theme.palette.primary.main, mr: 1, fontSize: '2rem' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: theme.palette.primary.main }}>
            {recipe.name}
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ mb: 2, color: theme.palette.text.secondary, fontWeight: 'medium' }}>
          Ingredients:
        </Typography>
        <IngredientList ingredients={recipe.ingredients} />
      </CardContent>
    </Card>
  );
});

const IngredientList = ({ ingredients }) => {
  const theme = useTheme();

  return (
    <List dense>
      {ingredients.map((ingredient, index) => (
        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
          <ListItemText
            primary={
              <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {ingredient.name}
                <Chip
                  label={`${ingredient.quantity}`}
                  size="small"
                  sx={{ 
                    ml: 1, 
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 'bold'
                  }}
                />
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RecipeCard;