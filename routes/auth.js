const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/AuthController');

const {runValidator} = require('../validators')
const {userRegisterValidator} = require('../validators/AuthValidator')

router.post('/register', userRegisterValidator, runValidator, register);
router.post('/login', userLoginValidator, runValidator, login);

module.exports = router;