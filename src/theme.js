import { createTheme } from '@mui/material/styles';

const AppTheme = createTheme({
  palette: {
    mode: 'light', // Puedes cambiarlo a 'dark' si prefieres un tema oscuro
    primary: {
      main: '#000000', // Cambia el color principal
    },
    secondary: {
      main: '#86b681', // Cambia el color secundario
    },
    background: {
      default: '#86b681', // Color de fondo por defecto
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`, // Cambia la tipografía si lo deseas
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none', // Evita que el texto de los botones esté en mayúsculas
    },
  },
});

export default AppTheme;
