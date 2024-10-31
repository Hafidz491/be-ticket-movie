const express = require("express");
const MovieController = require("../controllers/MovieController");

const router = express.Router();

router.post("/", MovieController.addMovie);
router.get("/all-movie", MovieController.getMovies);
router.get("/detail/:id", MovieController.detailMovie);

module.exports = router;
