const express = require('express');
const router = express.Router();

const accountRoutes = require('./account.routes');
const transferRoutes = require('./transfer.routes');
const authRoutes = require('./auth.routes');

// Agrupar rutas de módulos
router.use('/account-alpha', accountRoutes);
router.use('/transfer-beta', transferRoutes);
router.use('/auth', authRoutes);

module.exports = router;

