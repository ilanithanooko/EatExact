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


// Enable CORS for all routes
const allowedOrigins = ['https://eat-exact-frontend.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// routes
app.get('/', (req, res) => {
  res.send('Welcome to the EatExact API');
});
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
