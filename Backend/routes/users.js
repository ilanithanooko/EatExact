const express = require('express')

const router = express.Router()

// Controller functions
const { loginUser, signupUser, googleLogin } = require('../controllers/userController')

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.post('/google-login', googleLogin)


module.exports = router