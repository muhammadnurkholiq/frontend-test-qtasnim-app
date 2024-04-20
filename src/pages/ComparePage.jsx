import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetSoldItem } from '../redux/transactionSlice';
import { Card, Typography, Container, Box, Grid, CircularProgress } from '@mui/material';

const ComparePage = () => {
  const dispatch = useDispatch();
  const soldItems = useSelector((state) => state.transactions.soldItems);
  const status = useSelector((state) => state.transactions.status);

  useEffect(() => {
    dispatch(fetchGetSoldItem());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Compare Transactions
        </Typography>
      </Box>
      {status === 'loading' ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <Box p={2}>
                <Typography variant="h6">Most Sold Item</Typography>
                {soldItems && soldItems.mostSoldItem ? (
                  <>
                    <Typography variant="body2">Item Name: {soldItems.mostSoldItem.item_name}</Typography>
                    <Typography variant="body2">Quantity Sold: {soldItems.mostSoldItem.quantity_sold}</Typography>
                  </>
                ) : (
                  <Typography variant="body2">No data available.</Typography>
                )}
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Box p={2}>
                <Typography variant="h6">Least Sold Item</Typography>
                {soldItems && soldItems.leastSoldItem ? (
                  <>
                    <Typography variant="body2">Item Name: {soldItems.leastSoldItem.item_name}</Typography>
                    <Typography variant="body2">Quantity Sold: {soldItems.leastSoldItem.quantity_sold}</Typography>
                  </>
                ) : (
                  <Typography variant="body2">No data available.</Typography>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ComparePage;
