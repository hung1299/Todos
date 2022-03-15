import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import notificationApi from '../api/notificationsApi';

interface Notification {
  content: string;
  sender: string;
  seen: boolean;
  id: string;
  userId?: string;
}

interface NotificationState {
  value: Notification[];
}

const initialState: NotificationState = {
  value: [],
};

export const fetchAllNotification = createAsyncThunk(
  'notification/fetchAllNotification',
  async (userId: string) => {
    const { data } = await notificationApi.getAll(userId);

    return data;
  }
);

export const fetchAddNotification = createAsyncThunk(
  'notification/fetchAddNotification',
  async (params: {
    userId: string;
    notification: {
      content: string;
      sender: string;
      seen: boolean;
    };
  }) => {
    const { data } = await notificationApi.add(
      params.userId,
      params.notification
    );

    return data;
  }
);

export const fetchChangeSeenNotification = createAsyncThunk(
  'notification/fetchChangeSeenNotification',
  async (params: { userId: string; notification: Notification }) => {
    const { data } = await notificationApi.changeSeen(
      params.userId,
      params.notification
    );

    return data;
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllNotification.fulfilled, (state, action) => {
      console.log('Get All Notification completed');
      if (action.payload) state.value = action.payload;
    });
    builder.addCase(fetchAddNotification.fulfilled, (state, action) => {
      console.log('Add Notification completed');
      if (action.payload) state.value.push(action.payload);
    });
    builder.addCase(fetchChangeSeenNotification.fulfilled, (state, action) => {
      console.log('Change Seen Notification completed');
      if (action.payload) {
        const index = state.value.findIndex((n) => n.id === action.payload.id);

        state.value.splice(index, 1, action.payload);
      }
    });
  },
});

// export const { } = notificationSlice.actions;
export default notificationSlice.reducer;
