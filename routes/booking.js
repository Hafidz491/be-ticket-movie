const express = require("express");
const BookingController = require("../controllers/bookingController");

const router = express.Router();

router.post("/detail/:id/booking", BookingController.bookingMovie);

module.exports = router;
