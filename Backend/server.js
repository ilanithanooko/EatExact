require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");


// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use(cors({
  origin: 'https://eat-exact-frontend.vercel.app',
}));

// routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/user", userRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listening for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
