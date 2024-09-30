import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  Box,
  FormControl,
  FormLabel,
} from '@mui/material';
import { loginUser } from '../services/authService';  // Importar el servicio de autenticación
import ErrorModal from '../components/ErrorModal'; // Importar el modal de error

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar el mensaje de error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    let valid = true;
    if (!credentials.email) {
      setEmailError(true);
      setEmailErrorMessage('Email is required');
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!credentials.password) {
      setPasswordError(true);
      setPasswordErrorMessage('Password is required');
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        await loginUser(credentials.email, credentials.password);
        // Redirigir a la página principal o dashboard
        window.location.href = '/home'; // O ajusta la ruta según tu estructura
      } catch (error) {
        // Mostrar el mensaje de error que proviene del backend
        console.log(error); // Para depuración
        setErrorMessage(error.message); // Este es el mensaje genérico
        setModalOpen(true); // Abrir el modal de error
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Función para cerrar el modal
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: 3,
          boxShadow: 2,
          borderRadius: '16px', // Bordes redondeados
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontSize: '1.8rem',
            textAlign: 'center',
            marginBottom: 2,
            fontWeight: 500,
          }}
        >
          Sign In
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              size="small"
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              variant="outlined"
              value={credentials.email}
              onChange={handleChange}
              color={emailError ? 'error' : 'primary'}
              sx={{
                borderRadius: '8px', // Bordes redondeados en los inputs
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              size="small"
              error={passwordError}
              helperText={passwordErrorMessage}
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              autoComplete="current-password"
              required
              variant="outlined"
              value={credentials.password}
              onChange={handleChange}
              color={passwordError ? 'error' : 'primary'}
              sx={{
                borderRadius: '8px', // Bordes redondeados en los inputs
              }}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1,
              textTransform: 'none',
              fontSize: '1rem',
              borderRadius: '8px', // Bordes redondeados en los botones
            }}
          >
            Sign In
          </Button>
        </Box>
      </Card>

      {/* Modal de error */}
      <ErrorModal open={modalOpen} onClose={handleCloseModal} errorMessage={errorMessage} />
    </Container>
  );
};

export default Login;
