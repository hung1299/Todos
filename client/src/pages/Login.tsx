import {
  Alert,
  Button,
  Card,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { fetchLoginUser } from '../features/userSlice';

export default function Login() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleLogin = async () => {
    await dispatch(fetchLoginUser({ username, password }));

    setUsername('');
    setPassword('');
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid item xs={5}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Wrong Credentials!
          </Alert>
        </Snackbar>
        <Card variant='outlined' sx={{ minWidth: 380, p: 3, mt: 20 }}>
          <Typography
            align='center'
            variant='h4'
            sx={{ fontWeight: 'medium', mb: 5, color: 'blue' }}
          >
            Login
          </Typography>
          <Stack spacing={4}>
            <TextField
              label='Username'
              variant='outlined'
              sx={{ width: '100%', mr: 2 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label='Password'
              variant='outlined'
              sx={{ width: '100%', mr: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant='outlined'
              sx={{ padding: 1.5 }}
              onClick={() => handleLogin()}
            >
              LOGIN
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
