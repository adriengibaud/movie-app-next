import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/';

const getByName = async (infos) => {
  const url = `${baseUrl}search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${infos.name}&language=en-us&page=${infos.page}`;
  const response = await axios.get(url);
  return response.data;
};

const getById = async (id) => {
  const url = `${baseUrl}movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-us`;
  const response = await axios.get(url);
  return response.data;
};

const getCast = async (id) => {
  const url = `${baseUrl}movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-us`;
  const response = await axios.get(url);
  return response.data;
};

const getRecommendations = async (id) => {
  const url = `${baseUrl}movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-us`;
  const response = await axios.get(url);
  return response.data;
};

export default {
  getByName,
  getById,
  getCast,
  getRecommendations,
};
