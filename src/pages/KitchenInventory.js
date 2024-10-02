import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import { Kitchen as KitchenIcon } from "@mui/icons-material";
import Menu from "../components/Menu";
import { getKitchenInventory } from "../services/inventoryService"; // Asume que tienes este servicio

const KitchenInventory = () => {
  const [ingredients, setIngredients] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getKitchenInventory();
        setIngredients(data);
      } catch (error) {
        console.error("Error fetching kitchen inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <KitchenIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }}
            />
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="primary"
            >
              Ingredients Available in Kitchen
            </Typography>
          </Box>
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }} aria-label="inventory table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Product
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                  >
                    Quantity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.map((ingredient) => (
                  <TableRow
                    key={ingredient.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body1">{ingredient.name}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={ingredient.available_quantity}
                        color={
                          ingredient.available_quantity === 0
                            ? "error" // Color rojo para 0
                            : ingredient.available_quantity > 2
                            ? "success"
                            : "warning"
                        }
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          color: "white",
                          bgcolor: (theme) =>
                            ingredient.available_quantity === 0
                              ? alpha(theme.palette.error.main, 0.9) // Color de fondo rojo
                              : ingredient.available_quantity > 2
                              ? alpha(theme.palette.success.main, 0.9)
                              : alpha(theme.palette.warning.main, 0.9),
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default KitchenInventory;
