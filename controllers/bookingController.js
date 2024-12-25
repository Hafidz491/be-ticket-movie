const Booking = require("../models/Booking");

class BookingController {
  static async bookingMovie(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);

      if (!movie) {
        return res.status(404).json({ message: "Film tidak ditemukan" });
      }

      const { seats, date, time } = req.body;
      if (!seats || seats.length === 0) {
        return res.status(400).json({ message: "Tiket harus diisi" });
      }

      if (!date || !time) {
        return res
          .status(400)
          .json({ message: "Tanggal dan waktu harus diisi" });
      }

      // Validasi Seats
      const unavailableSeats = movie.seats.filter(
        (seat) => !movie.availableSeats.includes(seat)
      );
      if (unavailableSeats.length > 0) {
        return res.status(400).json({
          message: "Kursi sudah terisi atau kursi tidak tersedia!",
          unavailableSeats,
        });
      }

      const loggedInUser = req.user;
      if (!loggedInUser) {
        return res.status(401).json({ message: "User belum login" });
      }

      const totalPrice = movie.price * seats.length;

      const booking = new Booking({
        userId: loggedInUser._id,
        movieId: movie._id,
        seatNumber: seats,
        price: totalPrice,
        date: date,
        time: time,
      });

      await booking.save();

      movie.availableSeats = movie.availableSeats.filter(
        (seat) => !seats.includes(seat)
      );

      await movie.save();
      res.status(201).json({ message: "Booking berhasil", data: booking });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BookingController;
