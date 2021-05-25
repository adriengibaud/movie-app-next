import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const film = new Schema({
  userId: {
    type: String,
    required: true,
  },
  filmInfo: [
    {
      id: String,
      poster: String,
      title: String,
    },
  ],
});

const Film = mongoose.models.Film || mongoose.model('Film', film);

export default Film;
