import React from 'react';
import { Typography, Container, Box, Paper } from '@mui/material';
import Menu from '../components/Menu';
import CreateOrder from '../components/CreateOrder';
import OrderList from '../components/OrderList';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', height: '85vh' }}>
      {/* Menú lateral */}
      <Box
        sx={{
          width: { xs: '100%', sm: '35%', md: '30%', lg: '20%' },  // Ajustes responsivos
          borderRight: '1px solid #ccc',
          padding: 2,
        }}
      >
        <Menu />
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          width: { xs: '100%', sm: '75%', md: '80%', lg: '85%' },  // Ajustes responsivos
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          //backgroundColor: '#e8f5e9', // Un color de fondo claro
        }}
      >
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            ¡Bienvenido a la Cocina del Restaurante!
          </Typography>

          <Typography variant="h5" gutterBottom>
            We Will prepare the best dish for you
          </Typography>

          {/* Componente Crear Orden con bordes y espaciado */}
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              marginBottom: 3,
              borderRadius: 3,
              border: '1px solid #ccc',
              backgroundColor: '#f5f5f5',
              marginTop: 3,  // Espaciado extra si es necesario
            }}
          >
            <CreateOrder />
          </Paper>

          {/* Componente Listado de Órdenes con bordes y espaciado */}
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              marginBottom: 3,
              borderRadius: 3,
              border: '1px solid #ccc',
              backgroundColor: '#f5f5f5',
            }}
          >
            <OrderList />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
