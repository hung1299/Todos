import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeleteTodo, toggleTodo } from '../features/todoSlice';

import todoApi from '../api/todoApi';
import { RootState } from '../app/store';

interface todoProps {
  title: string;
  id: string;
  completed: boolean;
}

export default function Todo({ title, id, completed }: todoProps) {
  const userId = useSelector((state: RootState) => state.user.value.id);
  const dispatch = useDispatch();

  const handleRemoveTodo = async (id: string) => {
    await dispatch(fetchDeleteTodo({ userId, id }));
  };

  const handleToggleTodo = async (title: string, id: string) => {
    await todoApi.ChangeTodo(userId, id, {
      title,
      completed: !completed,
    });
    dispatch(toggleTodo(id));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        py: 2,
        px: 3,
        justifyItems: 'center',
        border: '1px solid lightgray',
        borderRadius: 2,
      }}
    >
      <Typography
        noWrap={true}
        variant='h6'
        sx={
          completed
            ? { width: '100%', textDecoration: 'line-through' }
            : { width: '100%' }
        }
        onClick={() => handleToggleTodo(title, id)}
      >
        {title}
      </Typography>
      <IconButton color='error' onClick={() => handleRemoveTodo(id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
