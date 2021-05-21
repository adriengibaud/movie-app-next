import { createSlice } from '@reduxjs/toolkit';
import genreApi from '../api/genre';

const initialState = [];

export const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre: (state, action) => {
      return action.payload;
    },
    setGenreActive: (state, action) => {
      const newArray = state.map((element) =>
        action.payload == element.id ? { ...element, isActive: true } : element
      );
      return newArray;
    },
    setGenreInactive: (state, action) => {
      const newArray = state.map((element) =>
        action.payload == element.id ? { ...element, isActive: false } : element
      );
      return newArray;
    },
  },
});

export const { setGenre, setGenreActive, setGenreInactive } =
  genreSlice.actions;

export const selectGenre = (state) => state.genre;

export default genreSlice.reducer;

export const fetchGenre = () => async (dispatch) => {
  try {
    const response = await genreApi.getAll();
    const genreWithStatus = response.map((e) => {
      return { ...e, isActive: false };
    });
    dispatch(setGenre(genreWithStatus));
  } catch {
    console.log('error');
  }
};
