import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ListData } from '../Types/userTypes';
import api from '../services/api';

const initialState = {
  userName: null,
  userEmail: null,
  userId: null,
  userImage: null,
  userList: [],
  status: 'idle',
  error: null,
};

export const addToList = createAsyncThunk(
  'user/addToList',
  async (data: ListData, thunkAPI) => {
    const response = await api.addToList(data);
    return response.data;
  }
);

export const updateWatchStatus = createAsyncThunk(
  'user/updateWatchStatus',
  async (data: ListData, thunkAPI) => {
    const response = await api.addToList(data);
    if (response.status === 200) return response.data;
  }
);

export const fetchUserList = createAsyncThunk(
  'user/getList',
  async (userId: string, thunkAPI) => {
    const response = await api.getUserList(userId);
    console.log(response);
    return response;
  }
);

export const deleteFilmUserList = createAsyncThunk(
  'user/deleteFilm',
  async (data: { userId: string; filmId: string }, thunkAPI) => {
    console.log(data);
    const response = await api.deleteFilmUserList(data);
    return response;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      if (action.payload.userId === state.userId) {
        state.status = 'fulfilled';
        state.userList = action.payload.userList;
      } else {
        state.error = 'wrong userId';
      }
    }),
      builder.addCase(fetchUserList.pending, (state, action) => {
        state.status = 'pending';
      }),
      builder.addCase(deleteFilmUserList.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.userList = state.userList.filter(
            (e) => e.filmId != action.payload.filmId
          );
        }
      });
    builder.addCase(addToList.fulfilled, (state, action) => {
      const filmInfo = {
        filmName: action.payload.filmName,
        filmId: action.payload.filmId,
        filmImage: action.payload.filmImage,
        watched: action.payload.watched,
      };
      console.log(filmInfo);
      state.userList = [...state.userList, filmInfo];
    });
    builder.addCase(updateWatchStatus.fulfilled, (state, action) => {
      const updatedFilm = {
        filmName: action.payload.filmName,
        filmId: action.payload.filmId,
        filmImage: action.payload.filmImage,
        watched: action.payload.watched,
      };
      const newState = state.userList.map((e) =>
        e.filmId === updatedFilm.filmId ? updatedFilm : e
      );
      state.userList = newState;
    });
  },
});

export const { setActiveUser, setUserLogoutState } = userSlice.actions;

export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserId = (state) => state.user.userId;
export const selectUserImage = (state) => state.user.userImage;
export const selectUserList = (state) => state.user.userList;

export default userSlice.reducer;
