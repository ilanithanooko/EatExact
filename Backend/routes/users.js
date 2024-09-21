const express = require('express')

const router = express.Router()

// Controller functions
const { loginUser, signupUser, getUser, setRole, setInfo } = require('../controllers/userController')

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// GET a single user
router.get('/:email', getUser)

// UPDATE user's role
router.put('/updateRole', setRole)

// UPDATE user's information
router.put('/updateInfo', setInfo)

module.exports = router