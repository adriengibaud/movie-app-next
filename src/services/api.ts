import axios from 'axios';

const baseUrl = '/api/';

const addToList = async (data) => {
  const url = `${baseUrl}film`;
  const response = await axios.post(url, data);
  return response.data;
};

const getUserList = async (userId) => {
  console.log(userId);
  const url = `${baseUrl}get/${userId}`;
  const response = await axios.get(url);

  return response.data;
};

const deleteFilmUserList = async (data) => {
  const url = `${baseUrl}film`;
  const response = await axios.delete(url, {
    data: { userId: data.userId, filmId: data.filmId },
  });
  const status = response.status;
  const filmId = response.data.filmId;
  const finalObject = { status, filmId };
  console.log(finalObject);
  return finalObject;
};

export default {
  addToList,
  getUserList,
  deleteFilmUserList,
};
