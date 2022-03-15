import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import notificationApi from '../api/notificationsApi';
import { RootState } from '../app/store';
import { fetchAddTodo } from '../features/todoSlice';
import { fetchAllUser } from '../features/userSlice';

interface UserInfo {
  username: string;
  userId: string;
}

export default function AddTodoOtherUser({ socket }: any) {
  const users = useSelector((state: RootState) => state.user.users);
  const { id: userId, username } = useSelector(
    (state: RootState) => state.user.value
  );
  const [todoInput, setTodoInput] = useState('');
  const [userToAdd, setUserToAdd] = useState({} as UserInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const handleAddTodo = async () => {
    if (!todoInput || !userToAdd.userId) return;

    dispatch(
      fetchAddTodo({
        userId: userToAdd.userId,
        todo: { title: todoInput, completed: false },
      })
    );

    await notificationApi.add(userToAdd.userId, {
      content: 'has give you an Todo',
      sender: username,
      seen: false,
    });

    socket.emit('push_notifications', userToAdd.username);

    setUserToAdd({
      username: '',
      userId: '',
    });
    setTodoInput('');
  };

  const handleClick = (userParam: UserInfo) => {
    if (userParam.username === userToAdd.username) {
      setUserToAdd({
        username: '',
        userId: '',
      });

      return;
    }
    setUserToAdd(userParam);
  };
  return (
    <Card variant='outlined' sx={{ maxWidth: 600, mx: 'auto', p: 2, mt: 5 }}>
      <Typography
        align='center'
        variant='h4'
        sx={{ fontWeight: 'bold', mb: 2, color: 'blue' }}
      >
        FOR OTHER
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Button>
          <Link style={{ textDecoration: 'none' }} to='/'>
            ADD Todo for YourSelf
          </Link>
        </Button>
      </Box>
      <Box sx={{ mb: 3, display: 'flex' }}>
        <TextField
          variant='outlined'
          sx={{ width: '100%', mr: 2 }}
          value={todoInput}
          label={
            userToAdd?.username
              ? 'Add todo to ' + userToAdd.username
              : 'Choose user to Add Todo'
          }
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <Button variant='outlined' onClick={() => handleAddTodo()}>
          ADD
        </Button>
      </Box>
      <Stack spacing={3} sx={{ maxHeight: 600, overflow: 'auto' }}>
        {users
          ?.filter((user) => user.id !== userId)
          .map((user, index) => (
            <Button
              key={index}
              variant={
                user.username === userToAdd.username ? 'contained' : 'outlined'
              }
              sx={{
                textTransform: 'none',
                display: 'flex',
                py: 2,
                px: 3,
                justifyItems: 'center',
                borderRadius: 2,
              }}
              onClick={() =>
                handleClick({ username: user.username, userId: user.id })
              }
            >
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {user.username}
              </Typography>
            </Button>
          ))}
      </Stack>
    </Card>
  );
}
