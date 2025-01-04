var express = require('express');
var router = express.Router();
const authController = require('../controller/authController');

// Primeira rota
router.get('/', authController.login);

module.exports = router;