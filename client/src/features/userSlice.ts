import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import login from '../api/login';
import userApi from '../api/userApi';

interface loginData {
  username: string;
  password: string;
}

interface userPayloadAction {
  id: string;
  username: string;
}

interface userState {
  value: {
    id: string;
    username: string;
  };
  users: userPayloadAction[];
}

const initialState: userState = {
  value: {
    id: '',
    username: '',
  },
  users: [],
};

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async ({ username, password }: loginData, thunkAPI) => {
    const user = await login(username.trim(), password.trim());

    return user;
  }
);

export const fetchAllUser = createAsyncThunk('user/fetchAllUser', async () => {
  const { data } = await userApi.getAllUser();

  return data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    GetUser: (state, action: PayloadAction<userPayloadAction>) => {
      state.value = action.payload;
    },
    LogoutUser: (state) => {
      state.value = {
        username: '',
        id: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginUser.pending, () => {
      console.log('Logging is Pending');
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      console.log('Logging Successfully');
      if (action.payload) state.value = action.payload;
    });
    builder.addCase(fetchLoginUser.rejected, () => {
      console.log('Logging Rejected!');
    });
    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      console.log('Get All User: Successfully!');
      if (action.payload) state.users = action.payload;
    });
  },
});

export const { GetUser, LogoutUser } = userSlice.actions;
export default userSlice.reducer;
