const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  producer: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
