import { createSlice } from '@reduxjs/toolkit';
import genreApi from '../services/genre';

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
    setAllGenreInactive: (state) => {
      const newArray = state.map((element) =>
        element.isActive === true ? { ...element, isActive: false } : element
      );
      return newArray;
    },
  },
});

export const {
  setGenre,
  setGenreActive,
  setGenreInactive,
  setAllGenreInactive,
} = genreSlice.actions;

export const selectGenre = (state) => state.genre;
export const selectActiveGenre = (state) =>
  state.genre.filter((e) => e.isActive === true);

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
