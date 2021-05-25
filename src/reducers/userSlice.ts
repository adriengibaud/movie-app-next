import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  userEmail: null,
  userId: null,
  userImage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userId = action.payload.userId;
      state.userImage = action.payload.userImage;
    },
    setUserLogoutState: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userId = null;
      state.userImage = null;
    },
  },
});

export const { setActiveUser, setUserLogoutState } = userSlice.actions;

export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserId = (state) => state.user.userId;
export const selectUserImage = (state) => state.user.userImage;

export default userSlice.reducer;
