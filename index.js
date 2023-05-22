const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { errorHandler } = require("./middleware/error");
const userRoutes = require("./routes/userRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URL;
const app = express();

// MIDDLEWARES
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/passwords", passwordRoutes);
app.use(errorHandler);

// DATABASE CONNECTION
mongoose
  .connect(url)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
