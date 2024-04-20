/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loading from './Loading';

const MySwal = withReactContent(Swal);

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirmation = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this transaction!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      setLoading(true);
      await onDelete(id);
      setLoading(false);
      MySwal.fire('Deleted!', 'The transaction has been deleted.', 'success');
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Box>
        <Typography variant="h6">{transaction.item_name}</Typography>
        <Typography variant="body2">Stock: {transaction.stock}</Typography>
        <Typography variant="body2">Quantity Sold: {transaction.quantity_sold}</Typography>
        <Typography variant="body2">Transaction Date: {transaction.transaction_date}</Typography>
        <Typography variant="body2">Item Type: {transaction.item_type}</Typography>
      </Box>
      <Box>
        <Button variant="contained" color="primary" onClick={() => onEdit(transaction)} style={{ marginRight: '10px' }}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleDeleteConfirmation(transaction.id)}>
          Delete
        </Button>
      </Box>
      {loading && <Loading open={loading} />}
    </Box>
  );
};

export default TransactionItem;
