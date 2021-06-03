import connectDB from '../../../api/middleware/mongodb';
import Film from '../../../api/models/film';
import { fetchFilmByName } from '../../../reducers/filmsSlice';
import { ListData } from '../../../Types/userTypes';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { userId } = req.query;
    console.log(userId);
    try {
      const result: ListData[] = await Film.find({ userId });
      const filmResults = result.map((e) => {
        return {
          filmName: e.filmName,
          filmId: e.filmId,
          filmImage: e.filmImage,
          watched: e.watched,
          genres: e.genres,
        };
      });
      const finalObject = { userId: result[0].userId, userList: filmResults };
      return res.status(200).send(finalObject);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
