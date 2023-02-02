const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e.message));
};

module.exports = connectDB;
