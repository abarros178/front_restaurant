import React, { useEffect, useState } from 'react'; 
import { Button, Typography, Box } from '@mui/material';
import { getLatestOrderCount } from '../services/orderService'; // Import the order service
import { createOrder } from '../services/managerService'; // Import the order service


const CreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchLatestOrderCount = async () => {
      try {
        const latestOrder = await getLatestOrderCount(); // Call the service to fetch the latest order
        setOrderCount(latestOrder + 1); // Assuming the response has a `count` property
      } catch (error) {
        console.error('Error fetching the latest order count:', error);
        // Handle the error as needed
      }
    };

    fetchLatestOrderCount(); // Fetch the latest order count on component mount
  }, []); // Empty dependency array means this runs once on mount

  const handleCreateOrder = async () => {
    setLoading(true); // Indicate that the request is in progress
    try {
      const result = await createOrder(); // Call the createOrder service
      setOrderCount(prevCount => prevCount + 1); // Update order count
      console.log('Orden creada:', result); // Handle the result as needed
    } catch (error) {
      console.error('Error al crear la orden:', error);
      // Here you can show an error message to the user if needed
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      height="18vh" 
      bgcolor="#f5f5f5" 
      padding="1rem" // Adds some padding around the Box
    >
      {/* Left side content */}
      <Box 
        textAlign="left" 
        sx={{ 
          flexGrow: 1, 
          marginRight: { xs: '10px', sm: '20px', md: '30px' }, 
          marginTop: { xs: '5px', sm: '10px', md: '15px' } 
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}>
          Orden #{orderCount} {/* Display the current order count */}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '1rem', md: '1.2rem' } }}>
          Estás por ingresar la orden <strong>#{orderCount}</strong>. Una vez confirmada, el plato será preparado y podrás seguir su progreso a través de los diferentes estados en el detalle de la orden.
        </Typography>
        
        {/* Button with responsive width */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreateOrder} // Call the function on click
          size="large" 
          sx={{ 
            marginTop: '1rem', 
            padding: '0.75rem 2rem', 
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            width: { xs: '100%', sm: 'auto' }, // Full width on extra-small screens, auto on larger
            maxWidth: '200px' // Optional: set a maximum width if desired
          }}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'CREANDO...' : 'CREAR ORDEN'}
        </Button>
      </Box>

      {/* Right side GIF */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: 'auto', 
          height: '100%' 
        }}
      >
        <img 
          src="https://cdn.pixabay.com/animation/2023/07/08/11/26/11-26-17-598_512.gif" // Replace with your GIF URL
          alt="Cooking GIF"
          style={{ 
            maxHeight: '100%', 
            maxWidth: '100%',  
            objectFit: 'contain' 
          }} 
        />
      </Box>
    </Box>
  );
};

export default CreateOrder;
