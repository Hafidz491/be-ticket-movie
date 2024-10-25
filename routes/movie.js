const express = require("express");
const MovieController = require("../controllers/MovieController");

const router = express.Router();

router.post("/", MovieController.addMovie);
router.get("/all-movie", MovieController.getMovies);

module.exports = router;
