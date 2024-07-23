const express = require('express')

const router = express.Router()

// Controller functions
const { loginUser, signupUser, googleLogin, setRole, setInfo } = require('../controllers/userController')

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// UPDATE a role
router.put('/updateRole', setRole)

router.put('/updateInfo', setInfo)

router.post('/google-login', googleLogin)


module.exports = router