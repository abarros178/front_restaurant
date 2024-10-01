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
  useTheme,
  Avatar,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Order History', icon: <HistoryIcon /> },
    { text: 'Ingredients', icon: <LocalGroceryStoreIcon /> },
    { text: 'Recipe', icon: <ReceiptIcon /> },
    { text: 'Purchase History', icon: <ShoppingCartIcon /> },
  ];

  const MenuContent = (
    <Box display="flex" flexDirection="column" height="100%">
      <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', padding: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ marginRight: 2 }}>A</Avatar>
          <Typography variant="h6" fontWeight="bold">
            Hello, Andres
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, overflow: 'auto', padding: 2 }}>
        {menuItems.map((item, index) => (
          <StyledListItem
            button
            key={item.text}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ padding: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<ExitToAppIcon />}
          sx={{ borderRadius: '8px' }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Tooltip title="Open menu" arrow>
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            display: { sm: 'none' },
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 1300,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? open : true}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            border: 'none',
            borderRadius: isMobile ? 0 : '16px',
            ...(!isMobile && {
              top: 20,
              left: 20,
              height: 'calc(100% - 40px)',
            }),
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
          },
        }}
      >
        {MenuContent}
      </Drawer>
    </>
  );
};

export default Menu;