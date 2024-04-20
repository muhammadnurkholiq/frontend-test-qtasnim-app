/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TransactionForm = ({ transaction, open, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    item_name: '',
    stock: '',
    quantity_sold: '',
    transaction_date: '',
    item_type: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        item_name: transaction.item_name,
        stock: transaction.stock,
        quantity_sold: transaction.quantity_sold,
        transaction_date: transaction.transaction_date,
        item_type: transaction.item_type,
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    MySwal.fire({
      title: 'Success!',
      text: transaction ? 'Transaction updated successfully' : 'Transaction added successfully',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{transaction ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
      <DialogContent>
        <TextField name="item_name" label="Item Name" value={formData.item_name} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="stock" label="Stock" type="number" value={formData.stock} onChange={handleChange} fullWidth margin="dense" />
        <TextField
          name="quantity_sold"
          label="Quantity Sold"
          type="number"
          value={formData.quantity_sold}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="transaction_date"
          label="Transaction Date"
          type="date"
          value={formData.transaction_date}
          onChange={handleChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField name="item_type" label="Item Type" value={formData.item_type} onChange={handleChange} fullWidth margin="dense" />
      </DialogContent>
      <DialogActions sx={{ paddingY: '16px', paddingRight: 3 }}>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <LoadingButton onClick={handleSubmit} variant="contained" color="primary" loading={loading} disabled={loading}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm;
