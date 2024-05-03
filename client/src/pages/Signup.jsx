import { Box, Button, TextField, Container } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import authApi from '../api/authApi';

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    setConfirmPasswordErrText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();

    let err = false;
    if (username === '') {
      setUsernameErrText('Username is required');
      err = true;
    }
    if (password === '') {
      setPasswordErrText('Password is required');
      err = true;
    }
    if (confirmPassword === '') {
      setConfirmPasswordErrText('Confirm Password is required');
      err = true;
    }
    if (password !== confirmPassword) {
      // setPasswordErrText('Passwords do not match');
      setConfirmPasswordErrText('Passwords do not match');
      err = true;
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await authApi.signup({ username, password, confirmPassword });
      setLoading(false);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      const errors = err.data.errors;
      errors.forEach((e) => {
        if (e.path === 'username') {
          setUsernameErrText(e.msg);
        }
        if (e.path === 'password') {
          setPasswordErrText(e.msg);
        }
        if (e.path === 'confirmPassword') {
          setConfirmPasswordErrText(e.msg);
        }
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component='form'
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              disabled={loading}
              error={usernameErrText !== ''}
              helperText={usernameErrText}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              label='Password'
              name='password'
              type='password'
              disabled={loading}
              error={passwordErrText !== ''}
              helperText={passwordErrText}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='confirmPassword'
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              disabled={loading}
              error={confirmPasswordErrText !== ''}
              helperText={confirmPasswordErrText}
            />
            <LoadingButton
              sx={{ mt: 3, mb: 2 }}
              variant='outlined'
              fullWidth
              color='success'
              type='submit'
              loading={loading}
            >
              Signup
            </LoadingButton>
          </Box>
          <Button component={Link} to='/login' sx={{ textTransform: 'none' }}>
            Already have an account? Login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Signup;