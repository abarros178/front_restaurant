import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { getLatestOrderCount } from '../services/orderService';
import { createOrder } from '../services/managerService';

const CreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchLatestOrderCount = async () => {
      try {
        const latestOrder = await getLatestOrderCount();
        setOrderCount(latestOrder + 1);
      } catch (error) {
        console.error('Error fetching the latest order count:', error);
      }
    };

    fetchLatestOrderCount();
  }, []);

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const result = await createOrder();
      setOrderCount(prevCount => prevCount + 1);
      console.log('Orden creada:', result);
    } catch (error) {
      console.error('Error al crear la orden:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      {/* Left side content */}
      <Box 
        sx={{ 
          flexGrow: 1,
          marginRight: { xs: 0, md: '2rem' },
          marginBottom: { xs: '1rem', md: 0 },
          textAlign: { xs: 'center', md: 'left' },
          maxWidth: { xs: '100%', md: '60%' },
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
            fontWeight: 'bold',
            color: theme.palette.primary.main,
          }}
        >
          Order #{orderCount}
        </Typography>
        <Typography 
          variant="body1" 
          gutterBottom 
          sx={{ 
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            marginBottom: '1rem',
          }}
        >
         You are about to place order <strong>#{orderCount}</strong>. Once confirmed, the dish will be prepared, and you will be able to track its progress through the different statuses in the order details.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreateOrder}
          size="large" 
          sx={{ 
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            width: { xs: '100%', sm: 'auto' },
            maxWidth: '200px',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          disabled={loading}
        >
          {loading ? 'CREANDO...' : 'CREAR ORDEN'}
        </Button>
      </Box>

      {/* Right side GIF */}
      {!isSmallScreen && (
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100%', md: '40%' },
            maxWidth: '200px',
            marginTop: { xs: '1rem', md: 0 },
          }}
        >
          <img 
            src="https://cdn.pixabay.com/animation/2023/07/08/11/26/11-26-17-598_512.gif"
            alt="Cooking GIF"
            style={{ 
              maxWidth: '100%',
              maxHeight: '150px',
              objectFit: 'contain',
            }} 
          />
        </Box>
      )}
    </Box>
  );
};

export default CreateOrder;