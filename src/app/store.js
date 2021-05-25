import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../reducers/themeSlice';
import genreReducer from '../reducers/genreSlice';
import filmsReducer from '../reducers/filmsSlice';
import userReducer from '../reducers/userSlice';

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    genre: genreReducer,
    user: userReducer,
    theme: themeReducer,
  },
});
