import TransactionList from '../components/TransactionList';
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom textAlign="center">
        Transactions
      </Typography>
      <TransactionList />
    </Container>
  );
};

export default HomePage;
