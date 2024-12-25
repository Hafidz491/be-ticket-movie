const Movie = require("../models/Movie");
const Booking = require("../models/Booking");
const User = require("../models/User");

const path = require("path");

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

  // static async getMovies(req, res) {
  //   try {
  //     const listMovies = await Movie.find();
  //     console.log(listMovies);
  //     res.status(201).json({ movies: listMovies });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  static async getMovies(req, res) {
    try {
      const listMovies = await Movie.find();

      // Pastikan imageUrl valid sebelum memodifikasi
      const updatedMovies = listMovies.map((movie) => {
        const imageUrl = movie.imageUrl
          ? `/images/${path.basename(movie.imageUrl)}` // Ambil nama file
          : null;

        return {
          ...movie.toObject(), // Konversi ke object biasa
          imageUrl,
        };
      });

      res.status(201).json({ movies: updatedMovies }); // Kirim data yang sudah dimodifikasi
    } catch (error) {
      console.error("Error in getMovies:", error); // Log error jika terjadi
      res.status(500).json({ message: error.message }); // Kirim respons error
    }
  }

  static async detailMovie(req, res) {
    try {
      // get ID
      const id = req.params.id;

      const movie = await Movie.findById(id);

      // checking movie id
      if (!movie) {
        res.status(404).json({ message: "Movie not found" });
      }

      const imageUrl = movie.imageUrl
        ? `/images/${path.basename(movie.imageUrl)}`
        : null;

      const updateDetailMovie = {
        ...movie.toObject(),
        imageUrl,
      };
      res.status(201).json(updateDetailMovie);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MovieController;
