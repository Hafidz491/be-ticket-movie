const Movie = require("../models/Movie");

class MovieController {
  static async addMovie(req, res) {
    const { name, rating, year, description, producer, cast, imageUrl } =
      req.body;

    const img = `uploads/${imageUrl}`;

    const movie = new Movie({
      imageUrl: img,
      name,
      rating,
      year,
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

  // static async bookingMovie(req, res) {
  //   try {
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }
}

module.exports = MovieController;
