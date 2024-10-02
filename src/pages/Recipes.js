import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Container,
  Fade,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Menu from "../components/Menu";
import { getRecipes } from "../services/recipeService";
import RecipeList from "../components/RecipeList";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        const groupedRecipes = groupRecipesByName(data);
        setRecipes(groupedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const groupRecipesByName = (data) => {
    const groupedRecipes = data.reduce((acc, item) => {
      if (!acc[item.recipe_id]) {
        acc[item.recipe_id] = {
          id: item.recipe_id,
          name: item.recipe_name,
          ingredients: [],
        };
      }
      acc[item.recipe_id].ingredients.push({
        name: item.ingredient_name,
        quantity: item.ingredient_quantity,
      });
      return acc;
    }, {});
    return Object.values(groupedRecipes);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        component="nav"
        sx={{
          width: { xs: "100%", sm: "250px" },
          flexShrink: 0,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <Menu />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 4, overflow: "auto" }}>
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
              <Box display="flex" alignItems="center" mb={4}>
                <RestaurantMenuIcon
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.main,
                    mr: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight="bold"
                  color="primary"
                >
                  Delicious Recipes
                </Typography>
              </Box>
              <RecipeList recipes={filteredRecipes} />
            </Paper>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default RecipePage;
