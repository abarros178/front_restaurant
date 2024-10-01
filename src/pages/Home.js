import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography, Container, Box, Paper, useMediaQuery } from '@mui/material';
import Menu from '../components/Menu';
import CreateOrder from '../components/CreateOrder';
import OrderList from '../components/OrderList';

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Verde para un tema de restaurante
    },
    secondary: {
      main: '#ff9800', // Naranja como color secundario
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

const Home = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}>
        {/* Menú lateral */}
        <Box
          component="nav"
          sx={{
            width: { xs: '100%', sm: '250px' },
            flexShrink: 0,
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            boxShadow: 2,
          }}
        >
          <Menu />
        </Box>

        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 250px)` },
            overflowY: 'auto',
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              gutterBottom 
              align="center"
              sx={{ 
                mb: 4,
                color: 'primary.main',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              ¡Bienvenido a la Cocina del Restaurante!
            </Typography>

            <Typography 
              variant="h5" 
              gutterBottom 
              align="center"
              sx={{ 
                mb: 6,
                color: 'text.secondary',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }
              }}
            >
              We will prepare the best dish for you
            </Typography>

            {/* Componente Crear Orden */}
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3 },
                mb: 4,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <CreateOrder />
            </Paper>

            {/* Componente Listado de Órdenes */}
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                backgroundColor: 'background.paper',
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: 6,
                },
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