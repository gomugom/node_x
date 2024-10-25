const express = require('express');
const router = express.Router();
const { joinController, loginController, logoutController } = require('../controllers/auth');
const {isLoggedIn, isNotLoggedIn} = require("../middlewares");

// /auth/join(회원가입)
router.post('/join', isNotLoggedIn, joinController);
router.post('/login', isNotLoggedIn, loginController);
router.get('/logout', isLoggedIn, logoutController);

module.exports = router;