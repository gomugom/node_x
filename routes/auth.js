const express = require('express');
const router = express.Router();
const { joinController } = require('../controllers/auth');

// /auth/join(회원가입)
router.post('/join', joinController);

module.exports = router;