import connectDB from '../../api/middleware/mongodb';
import Film from '../../api/models/film';
import film from '../film';
import { ListData } from '../../Types/userTypes';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { userId, filmId, filmImage, filmName } = req.body;
    console.log(userId, filmId, filmName, filmImage);
    if (userId && filmName && filmId && filmImage) {
      try {
        const film = new Film({
          userId,
          filmName,
          filmId,
          filmImage,
        });
        const filmCreated = await film.save();
        console.log(filmCreated);
        return res.status(200).send(filmCreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send('data_incomplete');
    }
  }
  if (req.method === 'DELETE') {
    const { userId, filmId } = req.body;
    console.log(userId, filmId);
    try {
      const film = await Film.deleteOne({ userId, filmId });
      return res.status(200).send({ film, filmId });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  } else {
    res.status(422).send('data_incomplete');
  }
};

export default connectDB(handler);
