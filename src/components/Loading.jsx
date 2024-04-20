/* eslint-disable react/prop-types */
import { Modal, CircularProgress, Box, Card, CardContent } from '@mui/material';

const Loading = ({ open }) => {
  return (
    <Modal open={open}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" height={100} width={100}>
              <CircularProgress />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default Loading;
