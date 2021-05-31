import connectDB from '../../api/middleware/mongodb';
import Film from '../../api/models/film';

const handler = async (req, res) => {
  console.log(req.method);
  if (req.method === 'POST') {
    const { userId, filmId, filmImage, filmName, watched } = req.body;
    console.log(userId, filmId, filmName, filmImage, watched);
    if (userId && filmName && filmId && filmImage && watched) {
      try {
        const film = new Film({
          userId,
          filmName,
          filmId,
          filmImage,
          watched,
        });
        const filmCreated = await film.save();
        return res.status(200).send(filmCreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      return res.status(422).send('data_incomplete');
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
