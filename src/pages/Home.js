import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import ErrorModal from '../components/ErrorModal'; // Importar el modal de error
import Menu from '../components/Menu'; // Importar el menú

const Home = () => {
  return (
    <Box display="flex" sx={{ minHeight: '100vh' }}>
      {/* Agrega el menú a la izquierda */}
      <Box sx={{ width: '260px' }}> {/* Fija el ancho del menú */}
        <Menu />
      </Box>
      
      {/* Contenedor principal con flexGrow para ocupar el espacio restante */}
      <Container sx={{ flexGrow: 1, padding: 4 }}> 
        <Typography variant="h3" gutterBottom>
          ¡Bienvenido a la Cocina del Restaurante!
        </Typography>
        <Button variant="contained" color="primary" href="/orders">
          Ver Órdenes
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
