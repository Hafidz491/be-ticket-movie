const express = require("express");
const BookingController = require("../controllers/bookingController");

const router = express.Router();

router.post("/booking-movie", BookingController.bookingMovie);

module.exports = router;
