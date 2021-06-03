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
    type: Number,
    required: true,
  },
  filmImage: {
    type: String,
    required: true,
  },
  watched: Boolean,
  genres: [Number],
});

const Film = mongoose.models.Film || mongoose.model('Film', film);

export default Film;
