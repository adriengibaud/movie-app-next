import connectDB from '../../api/middleware/mongodb';
import Film from '../../api/models/film';
import film from '../film';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { userId, filmInfo } = req.body;
    if (userId && filmInfo) {
      try {
        const film = new Film({
          userId,
          filmInfo,
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
  if (req.method === 'GET') {
    const { userId } = req.body;
    try {
      const result = await Film.find({ userId });
      console.log(result);
      return res.status(200).send(result);
    } catch (error) {
      return res.stauts(500).send(error.message);
    }
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);
