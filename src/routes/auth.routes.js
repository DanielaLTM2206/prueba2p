const express = require('express');
const router = express.Router();
const { authController } = require('../config/dependencies');

// POST /v1/auth/token
router.post('/token', authController.generateToken);

module.exports = router;
