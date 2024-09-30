import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import AppTheme from './theme'; // Importa el archivo de tema que creamos

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
    <CssBaseline /> {/* Esto asegura que el estilo básico del navegador sea eliminado */}
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
