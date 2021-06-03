import connectDB from '../../api/middleware/mongodb';
import Film from '../../api/models/film';

const handler = async (req, res) => {
  console.log(req.method);
  if (req.method === 'POST') {
    const { userId, filmId, filmImage, filmName, watched, genres } = req.body;
    console.log(userId, filmId, filmName, filmImage, watched, genres);
    console.log(typeof filmId);
    if (userId && filmName && filmId && filmImage && genres) {
      console.log('genre number type', typeof genres[0]);
      try {
        const query = { userId, filmId, filmName, filmImage, genres };
        const update = {
          watched,
        };
        const options = { upsert: true, new: true };
        const result = await Film.findOneAndUpdate(
          query,
          update,
          options,
          function (err, res) {
            if (err) return res.status(500).send(err.message);
            return res;
          }
        );
        return res.status(200).send(result);
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
