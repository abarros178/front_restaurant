import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderHistoryPage from './pages/OrdersHistory';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AppTheme from './theme'; // Importa el archivo de tema que creamos
import { SocketProvider } from './context/SocketContext'; // Import the SocketProvider

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline /> {/* Esto asegura que el estilo básico del navegador sea eliminado */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<SocketProvider><Home /></SocketProvider>} /> {/* Wrap only Home with SocketProvider */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/ordersDetail/:orderId" element={<OrderDetailPage />} />
          <Route path="/ordersHistory" element={<OrderHistoryPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
