const express = require('express');
const router = express.Router();
const { time } = require('../controllers/EventController');

router.get('/', time);

module.exports = router;