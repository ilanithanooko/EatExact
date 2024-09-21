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

// Fetch the OpenAI API key from environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json()); // Middleware to parse JSON requests
app.use((req, res, next) => {
  // Log the request method and path for debugging
  console.log(req.path, req.method);
  next();
});

// Enable CORS (Cross-Origin Resource Sharing) for local and production
const allowedOrigins = ['https://eat-exact-frontend.vercel.app', 'https://eat-exact-server.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (e.g., from Postman or curl)
    if (!origin) return callback(null, true);
    // If the origin is not allowed, return an error
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    // Otherwise, allow the request
    return callback(null, true);
  }
}));

// Routes definition
app.get('/', (req, res) => {
  res.send('Welcome to the EatExact API');
});
app.use("/api/recipes", recipeRoutes); // Routes related to recipes
app.use("/api/user", userRoutes); // Routes related to users
app.use("/api/familyMember", familyMemberRoutes); // Routes related to family members
app.use("/api/patient", patientRoutes); // Routes related to patients
app.use("/api/menu", menuRoutes); // Routes related to menus

// Call the OpenAI ChatGPT API
app.post('/api/chat', async (req, res) => {
  const prompt = req.body.prompt; // Get the prompt from the request body
  
  // OpenAI API endpoint
  const url = "https://api.openai.com/v1/chat/completions"; 
  
  // Set the headers for the request, including the API key for authorization
  const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
  };

  // Data to send to OpenAI's API
  const data = {
      model: "gpt-4o", // GPT-4 model
      messages: [
          { role: "system", content: "you are a recipe developer mastering in creating recipes for allergic or dietary restricted individuals." },
          { role: "user", content: prompt },
      ],
  };

  try {
    // Make a POST request to the OpenAI API
    const response = await axios.post(url, data, {
      headers,
      timeout: 10000, // Set a 10-second timeout for the API request
    });
    const result = response.data.choices[0].message.content; // Extract the generated message from the response
    res.json({ result }); // Send the result back to the client
  } catch (error) {
    // Handle errors when calling the ChatGPT API
    console.error("Error calling ChatGPT API:", error);
    console.error("Error response data:", error.response ? error.response.data : "No response data");
    console.error("Error response status:", error.response ? error.response.status : "No response status");
    res.status(500).send("Error calling ChatGPT API"); // Send a 500 status if an error occurs
  }
});

// Connect to MongoDB using the connection string in .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Start the server once connected to the database
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    // Log any errors that occur during the connection
    console.log(error);
  });
