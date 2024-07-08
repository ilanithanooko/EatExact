const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
      const user = await User.login(email, password)

      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body
  
    try {
      const user = await User.signup(firstName, lastName, email, password)

      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

  const googleLogin = async (req, res) => {
    const { token } = req.body;
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
  
      // Find or create user in your database
      let user = await User.findOne({ email: payload.email });
      if (!user) {
        user = new User({
          email: payload.email,
          name: payload.name,
          // Add other fields as needed
        });
        await user.save();
      }
  
      // Generate a token for your application's session
      const appToken = user.generateAuthToken();
  
      res.json({ success: true, token: appToken });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid token' });
    }
  }
  
module.exports = {
    loginUser,
    signupUser,
    googleLogin
}