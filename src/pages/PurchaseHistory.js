import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  TextField,
  InputAdornment,
  Paper,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "../components/Menu";
import PurchaseTable from "../components/PurchaseTable";
import { getPurchaseHistory } from "../services/purchaseService";
import debounce from "lodash/debounce";

const PurchaseHistory = () => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down("sm")); // Para detectar si es una pantalla pequeña

  const [purchases, setPurchases] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("purchase_date");
  const [searchTerm, setSearchTerm] = useState([]);
  const [localPurchases, setLocalPurchases] = useState([]);

  const fetchPurchases = useCallback(async () => {
    try {
      const response = await getPurchaseHistory(
        page,
        rowsPerPage,
        orderBy,
        order,
        searchTerm
      );
      setPurchases(response.purchases);
      setTotalRows(response.totalItems);
    } catch (error) {
      console.error("Error fetching purchase history:", error);
    }
  }, [page, rowsPerPage, orderBy, order, searchTerm]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  useEffect(() => {
    setLocalPurchases(purchases);
  }, [purchases]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchTerm(value);
        setPage(0);
      }, 300),
    []
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleRequestSort = useCallback(
    (property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleSearchChange = useCallback(
    (event) => {
      debouncedSearch(event.target.value);
    },
    [debouncedSearch]
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        flexDirection: { xs: "column", sm: "row" }, // Cambia la dirección en pantallas pequeñas
      }}
    >
      <Box
        component="nav"
        sx={{
          width: { xs: "100%", sm: "250px" },
          flexShrink: 0,
          borderRight: { sm: "1px solid" },
          borderColor: { sm: "divider" },
        }}
      >
        <Menu />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 250px)` },
        }}
      >
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Purchase History
          </Typography>

          <TextField
            label="Search purchases"
            variant="outlined"
            fullWidth
            sx={{ mb: 4 }}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Divider sx={{ mb: 4 }} />

          <PurchaseTable
            purchases={localPurchases}
            page={page}
            rowsPerPage={rowsPerPage}
            totalRows={totalRows}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default PurchaseHistory;
