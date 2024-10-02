import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: (theme) => theme.palette.primary.main }}>
        Available Recipes ({recipes.length})
      </Typography>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecipeList;