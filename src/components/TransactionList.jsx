import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, addTransaction, editTransaction, removeTransaction } from '../redux/transactionSlice';
import TransactionFilters from './TransactionFilters';
import TransactionItem from './TransactionItem';
import TransactionForm from './TransactionForm';
import Loading from './Loading';
import { Button, Grid, Box, Container, Typography } from '@mui/material';

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const status = useSelector((state) => state.transactions.status);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('transaction_date');
  const [order, setOrder] = useState('asc');
  const [openForm, setOpenForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(status === 'loading');
  }, [status]);

  useEffect(() => {
    dispatch(fetchTransactions({ item_name: searchTerm, sort_by: sortBy, order }));
  }, [dispatch, searchTerm, sortBy, order]);

  const openAddForm = () => {
    setSelectedTransaction(null);
    setOpenForm(true);
  };

  const openEditForm = () => {
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setSelectedTransaction(null);
  };

  const handleAddTransaction = async (data) => {
    await dispatch(addTransaction(data));
    closeForm();
  };

  const handleEditTransaction = async (data) => {
    const id = selectedTransaction?.id;
    await dispatch(editTransaction({ id, data }));
    closeForm();
  };

  const handleDeleteTransaction = async (id) => {
    await dispatch(removeTransaction(id));
    dispatch(fetchTransactions({ item_name: searchTerm, sort_by: sortBy, order }));
  };

  return (
    <Container maxWidth="md">
      <Box mb={4}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Button variant="contained" color="primary" onClick={openAddForm}>
              Add Transaction
            </Button>
          </Grid>
          <Grid item>
            <TransactionFilters onSearch={setSearchTerm} onSort={setSortBy} onOrderChange={setOrder} />
          </Grid>
        </Grid>
      </Box>
      {loading ? (
        <Loading open={loading} />
      ) : transactions.length > 0 ? (
        <Box mb={4}>
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={(data) => {
                setSelectedTransaction(data);
                openEditForm();
              }}
              onDelete={handleDeleteTransaction}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="h6" align="center">
          Data not found
        </Typography>
      )}
      <TransactionForm
        transaction={selectedTransaction}
        open={openForm}
        handleClose={closeForm}
        onSubmit={selectedTransaction ? handleEditTransaction : handleAddTransaction}
      />
    </Container>
  );
};

export default TransactionList;
