import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../reducers/themeSlice';
import genreReducer from '../reducers/genreSlice';
import filmsReducer from '../reducers/filmsSlice';

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    genre: genreReducer,
    theme: themeReducer,
  },
});
