require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const axios = require('axios');
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");
const familyMemberRoutes = require("./routes/familyMembers");
const patientRoutes = require("./routes/patients");
const menuRoutes = require("./routes/menus");

const apiKey = process.env.OPENAI_API_KEY;

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// Enable CORS for all routes
const allowedOrigins = ['https://eat-exact-frontend.vercel.app', 'http://localhost:3000'];

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
app.use("/api/familyMember", familyMemberRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/menu", menuRoutes);


// call chatGPT API
app.post('/api/chat', async (req, res) => {
  const prompt = req.body.prompt;
  
  const url = "https://api.openai.com/v1/chat/completions";
  
  const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
  };

  const data = {
      model: "gpt-4o",
      messages: [
          { role: "system", content: "you are a recipe developer mastering in creating recipes for allergic or dietary restricted individuals." },
          { role: "user", content: prompt },
      ],
  };

  try {
      const response = await axios.post(url, data, { headers });
      const result = response.data.choices[0].message.content;
      res.json({ result });
      // res.json({ prompt });

  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
    console.error("Error response data:", error.response ? error.response.data : "No response data");
    console.error("Error response status:", error.response ? error.response.status : "No response status");
    res.status(500).send("Error calling ChatGPT API");
  }
});

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
