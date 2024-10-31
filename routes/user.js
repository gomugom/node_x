const express = require('express');
const {followController} = require("../controllers/user");
const router = express();

// 팔로우 라우터
router.post('/:id/follow', followController);

module.exports = router;