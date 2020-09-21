const express = require('express');
const router = express.Router();

const { register, login, getAuthenticatedUser } = require('../controllers/auth.controller');

const { verifyToken } = require('../middleware/auth');


router.post('/register', register);  // signUp
router.post('/login', login);  // signIn

router.get('/', verifyToken, getAuthenticatedUser); 

module.exports = router;