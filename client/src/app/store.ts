import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../features/notificationSlice';
import todoReducer from '../features/todoSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
