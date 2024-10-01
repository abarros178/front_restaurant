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
import { getOrderDetails } from '../services/orderService'; // Asegúrate de crear este servicio

const OrderDetailPage = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { orderId } = useParams(); // Asumiendo que usas react-router y el ID está en la URL

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const data = await getOrderDetails(orderId);
                setOrderDetails(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError('No se pudo cargar los detalles de la orden. Por favor, intenta de nuevo.');
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
        return <Typography>No se encontraron detalles para esta orden.</Typography>;
    }

    const steps = [
        { label: 'Entered', description: 'La orden ha sido registrada y pronto comenzará su preparación' },
        { label: 'Insufficient', description: 'Ingredientes insuficientes, esperando más suministros' },
        { label: 'Purchase In Progress', description: 'Comprando ingredientes adicionales' },
        { label: 'Preparation', description: 'El chef está cocinando el plato' },
        { label: 'Completed', description: 'La orden ha sido completada y está lista para ser entregada' },
    ];

    const statusToStepIndex = {
        'ENT': 0,
        'INSUF': 1,
        'PRGP': 2,
        'PREP': 3,
        'COMP': 4
    };

    const activeStep = statusToStepIndex[orderDetails.status_code] || 0;

    // Adaptación de los datos recibidos al formato esperado por los componentes
    const adaptedOrderDetails = {
        ...orderDetails,
        dish: {
            name: orderDetails.recipes_name, // Esto debería venir de la API
            description: orderDetails.description,
            ingredients: orderDetails.ingredients
        },
        history: orderDetails.history.map(event => ({
            action: event.status_name,
            timestamp: event.change_timestamp,
            details: event.source // Puedes ajustar esto según la información que quieras mostrar
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