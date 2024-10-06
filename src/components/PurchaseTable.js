import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

// Mapeo entre las columnas mostradas y los nombres de columnas en la API
const columnMapping = {
  Id: 'Product',
  purchase_date: 'Date',
  quantity: 'Amount',
  order_id: '# Order',
};

const apiColumnMapping = {
  Product: 'id',
  Date: 'purchase_date',
  Amount: 'quantity',
  '# Order': 'order_id',
};

const PurchaseTable = ({
  purchases,
  page,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  order,
  orderBy,
  onRequestSort,
}) => {
  const theme = useTheme();

  // Maneja el orden al hacer clic en el encabezado de la columna
  const handleRequestSort = (property) => {
    const apiProperty = apiColumnMapping[property] || property; // Convierte a nombre de la API
    onRequestSort(apiProperty); // Envío el nombre de la API en lugar del mostrado
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <TableContainer
        component={Box}
        sx={{
          borderRadius: "16px",
          overflowX: "auto", // Agregamos overflowX para permitir desplazamiento horizontal en móviles
          boxShadow: theme.shadows[1],
        }}
      >
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
            <TableRow>
              {Object.entries(columnMapping).map(([apiColumn, label]) => (
                <TableCell key={apiColumn}>
                  <TableSortLabel
                    active={orderBy === apiColumn}
                    direction={orderBy === apiColumn ? order : 'asc'}
                    onClick={() => handleRequestSort(label)}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: "bold",
                        color: theme.palette.primary.contrastText,
                      }}
                    >
                      {label}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  "&:hover": {
                    backgroundColor:
                      purchase.order_id !== "N/A"
                        ? theme.palette.action.selected
                        : "inherit",
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2">{purchase.ingredient_name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(purchase.purchase_date).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{purchase.quantity}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{purchase.order_id}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalRows}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default PurchaseTable;
