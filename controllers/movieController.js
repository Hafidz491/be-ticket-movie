const Movie = require("../models/Movie");

class MovieController {
  static async addMovie(req, res) {
    const movie = await Movie({
      name: req.body.name,
      rating: req.body.rating,
      year: req.body.year,
      description: req.body.description,
    });
    try {
      const newMovie = await movie.save();
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMovies(req, res) {
    try {
      const listMovies = await Movie.find();
      console.log(listMovies);
      res.status(201).json(listMovies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MovieController;
