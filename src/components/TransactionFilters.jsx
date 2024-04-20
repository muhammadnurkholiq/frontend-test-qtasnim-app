/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';

const TransactionFilters = ({ onSearch, onSort, onOrderChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('transaction_date');
  const [order, setOrder] = useState('asc');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  const handleOrderChange = (e) => {
    const value = e.target.value;
    setOrder(value);
    onOrderChange(value);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <TextField label="Search" value={searchTerm} onChange={handleSearchChange} />
      </Grid>
      <Grid item>
        <TextField select label="Sort by" value={sortBy} onChange={handleSortChange}>
          <MenuItem value="transaction_date">Transaction Date</MenuItem>
          <MenuItem value="item_name">Item Name</MenuItem>
        </TextField>
      </Grid>
      <Grid item>
        <TextField select label="Order" value={order} onChange={handleOrderChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default TransactionFilters;
