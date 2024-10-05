import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, useTheme, useMediaQuery, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import Menu from '../components/Menu';
import OrderHeader from '../components/OrderHeader';
import OrderStepper from '../components/OrderStepper';
import OrderHistory from '../components/OrderHistory';
import DishDetails from '../components/DishDetails';
import IngredientsList from '../components/IngredientsList';
import OrderHistoryTimeline from '../components/OrderHistoryTimeline';
import { getOrderDetails } from '../services/orderService'; // Make sure to create this service

const OrderDetailPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    const { orderId } = useParams(); // Assuming you use react-router and the ID is in the URL

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const data = await getOrderDetails(orderId);
                setOrderDetails(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError('Could not load order details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!orderDetails) {
        return <Typography>No details found for this order.</Typography>;
    }

    const steps = [
        { label: 'Entered', description: 'The order has been recorded and will soon begin preparation.' },
        { label: 'Insufficient', description: 'Insufficient ingredients, waiting for more supplies.' },
        { label: 'Purchase In Progress', description: 'Buying additional ingredients.' },
        { label: 'Preparation', description: 'The chef is cooking the dish.' },
        { label: 'Completed', description: 'The order has been completed and is ready for delivery.' },
    ];

    const statusToStepIndex = {
        'ENT': 0,
        'INSUF': 1,
        'PRGP': 2,
        'PREP': 3,
        'COMP': 4
    };

    const activeStep = statusToStepIndex[orderDetails.status_code] || 0;

    // Adaptation of the received data to the expected format by the components
    const adaptedOrderDetails = {
        ...orderDetails,
        dish: {
            name: orderDetails.recipes_name, // This should come from the API
            description: orderDetails.description,
            ingredients: orderDetails.ingredients
        },
        history: orderDetails.history.map(event => ({
            action: event.status_name,
            timestamp: event.change_timestamp,
            details: event.source // You can adjust this according to the information you want to display
        }))
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Menu />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${240}px)` },
                    ml: { sm: `${240}px` },
                }}
            >
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: '16px' }}>
                        <OrderHeader orderId={adaptedOrderDetails.id} />
                        <OrderStepper activeStep={activeStep} steps={steps} />
                        <OrderHistory
                            orderId={orderDetails.id}
                            dishName={orderDetails.recipes_name}
                            buy={orderDetails.buy}
                        />

                        <OrderHistoryTimeline history={adaptedOrderDetails.history} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <DishDetails orderId={adaptedOrderDetails.id} dish={adaptedOrderDetails.dish} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <IngredientsList ingredients={adaptedOrderDetails.ingredients} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default OrderDetailPage;
