import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const film = new Schema({
  userId: {
    type: String,
    required: true,
  },
  filmName: {
    type: String,
    required: true,
  },
  filmId: {
    type: String,
    required: true,
  },
  filmImage: {
    type: String,
    required: true,
  },
});

const Film = mongoose.models.Film || mongoose.model('Film', film);

export default Film;
