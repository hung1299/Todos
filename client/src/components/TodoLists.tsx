import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';
import { fetchAddTodo, fetchAllTodo } from '../features/todoSlice';
import Todo from './Todo';

export default function TodoLists() {
  const todos = useSelector((state: RootState) => state.todos.value);

  const { id: userId } = useSelector((state: RootState) => state.user.value);

  const [todoInput, setTodoInput] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTodo(userId));
  }, [dispatch, userId]);

  const handleAddTodo = () => {
    if (!todoInput) return;
    dispatch(
      fetchAddTodo({ userId, todo: { title: todoInput, completed: false } })
    );

    setTodoInput('');
  };
  return (
    <Card variant='outlined' sx={{ maxWidth: 600, mx: 'auto', p: 2, mt: 5 }}>
      <Typography
        align='center'
        variant='h4'
        sx={{ fontWeight: 'bold', mb: 2, color: 'blue' }}
      >
        FOR ME
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 1,
        }}
      >
        <Button>
          <Link style={{ textDecoration: 'none' }} to='/add-other'>
            ADD Todo for Other User
          </Link>
        </Button>
      </Box>
      <Box sx={{ mb: 3, display: 'flex' }}>
        <TextField
          variant='outlined'
          sx={{ width: '100%', mr: 2 }}
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <Button variant='outlined' onClick={() => handleAddTodo()}>
          ADD
        </Button>
      </Box>
      <Stack spacing={3} sx={{ maxHeight: 600, overflow: 'auto' }}>
        {todos
          ?.map((todo: any) => (
            <Todo
              key={todo.id}
              title={todo.title}
              id={todo.id}
              completed={todo.completed}
            />
          ))
          .reverse()}
      </Stack>
    </Card>
  );
}
