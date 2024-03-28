import { useSelector, useDispatch } from 'react-redux';
import {
  Drawer,
  Box,
  IconButton,
  List,
  Typography,
  ListItem,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import assets from '../../assets/index';
import { useNavigate } from 'react-router-dom';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const sidebarWith = 250;

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{
        width: sidebarWith,
        height: '100vh',
        '& > div': { borderRight: 'none' },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWith,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              Favourites
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              Private
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
