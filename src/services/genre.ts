import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/';

const getAll = async () => {
  const url = `${baseUrl}genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-us`;
  const response = await axios.get(url);
  return response.data.genres;
};

export default {
  getAll,
};
