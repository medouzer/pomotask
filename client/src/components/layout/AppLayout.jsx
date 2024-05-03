import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authUtils from '../../utils/authUtils';
import Loading from '../common/Loading';
import Sidebar from '../../components/common/Sidebar';
import { setUser } from '../../redux/features/userSlice';
import MenuAppBar from '../../components/common/Menuappbar';

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/Landingpage');
      } else {
        dispatch(setUser(user));
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);
  return loading ? (
    <Loading fullHeight />
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MenuAppBar />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            width: 'max-content',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
