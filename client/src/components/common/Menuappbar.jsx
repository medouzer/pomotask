import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  Button,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import authUtils from '../../utils/authUtils';
import Fade from '@mui/material/Fade';
import Timer from './Timer';

export default function MenuAppBar() {
  const user = useSelector((state) => state.user.value);
  const username = user.username;
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(true);

  const [anchorEltimer, setAnchorEltimer] = React.useState(null);
  const open = Boolean(anchorEltimer);
  const handleClick = (event) => {
    setAnchorEltimer(event.currentTarget);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await authUtils.isAuthenticated();
        if (!isAuthenticated) {
          setAuth(false);
        } else {
          setAuth(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEltimer(null);
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name) => {
    if (!name) return;
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const signup = () => {
    navigate('/signup');
  };

  const login = () => {
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            POMOTASK
          </Typography>
          {auth && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                id='fade-button'
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ marginRight: '20px' }}
              >
                PomodoroTimer
              </Button>
              <Menu
                id='fade-menu'
                // MenuListProps={{
                //   'aria-labelledby': 'fade-button',
                // }}
                anchorEl={anchorEltimer}
                open={open}
                onClose={handleClose}
                // TransitionComponent={Fade}
                PaperProps={{
                  style: {
                    width: 500,
                    height: 500,
                  },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Box>
                  <Timer />
                </Box>
              </Menu>
              <Avatar
                {...stringAvatar(username)}
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
                sx={{ cursor: 'pointer' }}
              />
              <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <Avatar
                    {...stringAvatar(username)}
                    sx={{ cursor: 'pointer' }}
                  />
                  {user.username}
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
            <div>
              <Button
                variant='contained'
                onClick={login}
                sx={{ marginRight: '10px' }}
              >
                Login
              </Button>
              <Button variant='contained' onClick={signup}>
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
