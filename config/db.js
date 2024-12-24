const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Listening on port 5000");
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { connect };
