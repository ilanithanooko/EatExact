const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to verify that the user is authenticated
const requireAuth = async (req, res, next) => {
  // Check for 'Authorization' header in the request
  const { authorization } = req.headers;

  // If no authorization token is provided, return a 401 Unauthorized response
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  // Extract the token from the 'Authorization' header
  const token = authorization.split(' ')[1];

  try {
    // Verify the token using the secret from env file
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Find user from db by ID and attach user's ID to the request object
    req.user = await User.findOne({ _id }).select('_id');

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);

    // If token verification fails, return a 401 Unauthorized response
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;