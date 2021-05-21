import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import filmsApi from '../api/films';

const initialState = {
  films: [],
  activeFilm: {},
  page: 0,
  total_pages: 0,
  status: 'idle',
  error: null,
};

export const fetchFilmByName = createAsyncThunk(
  'films/fetchByName',
  async (infos: { name: string; page: number }, thunkAPI) => {
    const response = await filmsApi.getByName(infos);
    console.log(response);
    return response;
  }
);

export const fetchFilmById = createAsyncThunk(
  'films/fetchById',
  async (id: string | number, thunkAPI) => {
    const filmInfosResponse = await filmsApi.getById(id);
    const filmCast = await filmsApi.getCast(id);
    const filmRecommendations = await filmsApi.getRecommendations(id);
    console.log(filmCast);
    const filmInfos = { ...filmInfosResponse, filmCast, filmRecommendations };
    return filmInfos;
  }
);

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFilmByName.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      if (action.payload.page >= 2) {
        state.films = [...state.films, ...action.payload.results];
      } else {
        state.films = action.payload.results;
      }
    },
    [fetchFilmByName.pending]: (state, action) => {
      state.status = 'pending';
    },
    [fetchFilmById.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.activeFilm = action.payload;
    },
    [fetchFilmById.pending]: (state, action) => {
      state.status = 'pending';
    },
  },
});

export const {} = filmsSlice.actions;

export const selectFilms = (state) => state.films.films;
export const statusFilms = (state) => state.films.status;
export const selectPageFilms = (state) => state.films.page;
export const selectTotalPageFilms = (state) => state.films.total_pages;

export default filmsSlice.reducer;

/*export const fetchFilmByName = (name, page) => async (dispatch) => {
  dispatch(setStatusPending());
  try {
    const response = await filmsApi.getByName(name, page);
    console.log(response.results);
    dispatch(setFilms(response.results));
    dispatch(setStatusFulfilled());
  } catch {
    dispatch(setStatusError());
  }
};
*/
