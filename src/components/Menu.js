import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
  Box,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Menu = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{ display: { sm: 'none' } }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            border: 'none',
            borderRadius: '16px',
            padding: '16px',
            width: '240px',
            backgroundColor: '#f5f5f5',
            position: isMobile ? 'relative' : 'fixed', // Fijo en pantallas grandes
            top: '20px', // Despegar del borde superior
            left: '20px', // Despegar del borde izquierdo
            height: 'calc(100% - 80px)', // Altura completa menos el margen superior
            zIndex: 1200, // Asegura que esté por encima de otros componentes
          },
        }}
      >
        <Box display="flex" flexDirection="column" height="100%">
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6" fontWeight="bold" align="center">
              Hello, Andres
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Order History" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LocalGroceryStoreIcon />
              </ListItemIcon>
              <ListItemText primary="Ingredients" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Recipe" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Purchase History" />
            </ListItem>
          </List>
          <Divider sx={{ marginY: 2 }} />
          <Box sx={{ padding: '8px' }}>
            <Button variant="contained" color="secondary" fullWidth sx={{ borderRadius: '8px' }}>
              Log Out
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Menu;
