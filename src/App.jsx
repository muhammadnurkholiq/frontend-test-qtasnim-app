import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import HomePage from './pages/HomePage';
import ComparePage from './pages/ComparePage';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Container>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/compare">
                Compare
              </Button>
            </Container>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '16px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
