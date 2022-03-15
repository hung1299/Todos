import { Avatar, Button, Tooltip, Zoom } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from '../app/store';
import AddTodoOtherUser from '../components/AddTodoOtherUser';
import Notifications from '../components/Notifications';
import TodoLists from '../components/TodoLists';
import { addAllTodo, fetchAllTodo } from '../features/todoSlice';
import { LogoutUser } from '../features/userSlice';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { fetchAllNotification } from '../features/notificationSlice';

const socket = io('http://localhost:8000/');
export default function Home() {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(addAllTodo([]));
    socket.emit('user_leave', user.username);
    localStorage.removeItem('user');
    dispatch(LogoutUser());
  };

  useEffect(() => {
    console.log('hehe');
    socket.emit('new_user', user.username);
    socket.on('force_getNotifi', () => {
      dispatch(fetchAllNotification(user.id));
      dispatch(fetchAllTodo(user.id));
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, [dispatch, user]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 2,
          mr: 2,
        }}
      >
        <Tooltip TransitionComponent={Zoom} arrow title={user.username}>
          <Avatar sx={{ bgcolor: '#1769aa' }}>
            {user.username.slice(0, 1)}
          </Avatar>
        </Tooltip>
        <Notifications />
        <Button color='error' onClick={() => handleLogout()} variant='outlined'>
          Logout
        </Button>
      </Box>
      <Routes>
        <Route path='/' element={<TodoLists />} />
        <Route
          path='/add-other'
          element={<AddTodoOtherUser socket={socket} />}
        />
      </Routes>
    </Box>
  );
}
