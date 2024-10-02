import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import OrderSearchBar from '../components/OrderSearchBar';
import OrderTable from '../components/OrderTable';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import { getOrders } from '../services/orderService';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage, orderBy, order, searchTerm]);

  const fetchOrders = async () => {
    try {
      const data = await getOrders(page + 1, rowsPerPage, orderBy, order, searchTerm);
      setOrders(data.orders);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Manejar el error (e.g., mostrar un mensaje al usuario)
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleOrderDetail = (orderId) => {
    navigate(`/ordersDetail/${orderId}`);
  };

  const sortedOrders = orders.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return b[orderBy] < a[orderBy] ? -1 : 1;
    }
  });

  const visibleRows = sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Box
          component="nav"
          sx={{
            width: { xs: '100%', sm: '250px' },
            flexShrink: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Menu />
        </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            minHeight: 'calc(100vh - 48px)',
            borderRadius: '16px',
            overflow: 'auto',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Order History
          </Typography>
          <OrderSearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <OrderTable
            rows={visibleRows}
            orderBy={orderBy}
            order={order}
            onRequestSort={handleRequestSort}
            onOrderDetail={handleOrderDetail}
            page={page}
            rowsPerPage={rowsPerPage}
            totalRows={totalItems}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default OrderHistoryPage;
