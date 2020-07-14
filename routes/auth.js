const express = require('express');
const router = express.Router();
const { register } = require('../controllers/AuthController');

const {runValidator} = require('../validators')
const {userRegisterValidator} = require('../validators/AuthValidator')

router.post('/register', userRegisterValidator, runValidator, register);

module.exports = router;