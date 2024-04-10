import { Box, Button } from '@mui/material';
import MenuAppBar from '../components/common/Menuappbar';

const Landingpage = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuAppBar />
        <h2>med ouzer</h2>
      </Box>
    </>
  );
};

export default Landingpage;
