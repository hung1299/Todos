import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import todoApi from '../api/todoApi';

interface TodoState {
  value: Todo[];
}

interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

interface addTodoParamsThunk {
  userId: string;
  todo: Todo;
}

const initialState: TodoState = {
  value: [],
};

export const fetchAllTodo = createAsyncThunk(
  'todo/fetchAllTodo',
  async (userId: string) => {
    const { data } = await todoApi.getAll(userId);

    return data;
  }
);

export const fetchAddTodo = createAsyncThunk(
  'todo/fetchAddTodo',
  async (params: addTodoParamsThunk) => {
    const { data } = await todoApi.add(params.userId, params.todo);

    return data;
  }
);

export const fetchDeleteTodo = createAsyncThunk(
  'todo/fetchDeleteTodo',
  async (ParamsId: { userId: string; id: string }) => {
    await todoApi.delete(ParamsId.userId, ParamsId.id);

    return ParamsId.id;
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    toggleTodo: (state, action: PayloadAction<string>) => {
      state.value.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
    addAllTodo: (state, action: PayloadAction<Todo[]>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTodo.pending, () => {
      console.log('Get All To do is Pending');
    });
    builder.addCase(fetchAllTodo.fulfilled, (state, action) => {
      console.log('Get All To do completed');
      if (action.payload) state.value = action.payload;
    });
    builder.addCase(fetchAllTodo.rejected, () => {
      console.log('Get All To do Rejected');
    });
    builder.addCase(fetchAddTodo.fulfilled, (state, action) => {
      console.log('Add To do completed');
      if (action.payload) state.value.push(action.payload);
    });
    builder.addCase(fetchDeleteTodo.fulfilled, (state, action) => {
      console.log('Delete To do completed');
      if (action.payload) {
        const index = state.value.findIndex(
          (todo) => todo.id === action.payload
        );
        state.value.splice(index, 1);
      }
    });
  },
});

export const { toggleTodo, addAllTodo } = todoSlice.actions;
export default todoSlice.reducer;
