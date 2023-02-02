const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database
connectDB();

// ---------ALL app routes-----------------

// below route is for getting the status of job
app.use("/api", require("./routes/apiRoute"));



// app listening on port 5000
app.listen(process.env.PORT, () => {
  console.log("Server runnning on PORT 5000...");
});
