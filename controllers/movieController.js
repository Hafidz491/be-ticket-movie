const Movie = require("../models/Movie");

class MovieController {
  static async addMovie(req, res) {
    const { name, rating, year, price, description, producer, cast } = req.body;

    console.log(req.file);
    if (!req) {
      return res.status(400).json({ message: "File gambar tidak diunggah" });
    }

    const imageUrl = req.file.path;

    const movie = new Movie({
      imageUrl,
      name,
      rating,
      year,
      price,
      cast,
      producer,
      description,
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

  static async detailMovie(req, res) {
    try {
      // get ID
      const id = req.params.id;

      const movie = await Movie.findById(id);

      // checking movie id
      if (!id) {
        res.status(404).json({ message: "Movie not found" });
      }

      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async bookingMovie(req, res) {
    try {
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MovieController;
