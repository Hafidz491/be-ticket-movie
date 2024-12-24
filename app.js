var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

var indexRouter = require("./routes/index");
var movieRouter = require("./routes/movie");
var userRouter = require("./routes/users");

var app = express();
const port = process.env.PORT || 5000;

// Static folder untuk menyajikan gambar
app.use("/images", express.static(path.join(__dirname, "public/images")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({}));

db.connect();

// routes
app.use("/", indexRouter);
app.use("/movie", movieRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
