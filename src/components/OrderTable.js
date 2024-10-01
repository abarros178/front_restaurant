import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

// Mapeo entre las columnas mostradas y los nombres de columnas en la API
const columnMapping = {
  id: 'ID',
  created_at: 'Date',
  status_name: 'Status',
  name: 'Recipe',
};

const apiColumnMapping = {
  ID: 'id',
  Date: 'created_at',
  Status: 'status_name',
  Recipe: 'name',
};

const OrderTable = ({
  rows,
  orderBy,
  order,
  onRequestSort,
  onOrderDetail,
  page,
  rowsPerPage,
  totalRows,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  // Maneja el orden al hacer clic en el encabezado de la columna
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    const apiProperty = apiColumnMapping[property] || property; // Convierte a nombre de la API
    onRequestSort(apiProperty); // Envío el nombre de la API en lugar del mostrado
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {Object.entries(columnMapping).map(([apiColumn, label]) => (
                <TableCell key={apiColumn}>
                  <TableSortLabel
                    active={orderBy === apiColumn}
                    direction={orderBy === apiColumn ? order : 'asc'}
                    onClick={() => handleRequestSort(label)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell component="th" scope="row">
                  #{row.id}
                </TableCell>
                <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
                <TableCell>{row.status_name}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton size="small" onClick={() => onOrderDetail(row.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </>
  );
};

export default OrderTable;
