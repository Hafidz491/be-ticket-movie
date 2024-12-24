const express = require("express");
const MovieController = require("../controllers/movieController");
const upload = require("../config/multerConfig");

const router = express.Router();

router.post("/add-movie", upload.single("imageUrl"), MovieController.addMovie);
router.get("/all-movie", MovieController.getMovies);
router.get("/detail/:id", MovieController.detailMovie);

module.exports = router;
