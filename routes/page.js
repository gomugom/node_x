const express = require('express');

const router = express.Router();
const { renderJoinController, renderProfileController, renderMainController} = require('../controllers/page');
const {isNotLoggedIn, isLoggedIn} = require("../middlewares");

router.use((req, res, next) => {
   // locals(지역변수)에 저장시 다른 라우터 들에서 다 접근이 가능함 : 미들웨어, 뷰간 데이터 전달이 가능함
    // 해당 요청이 끝나면 사라짐
   res.locals.user = null;
   res.locals.followerCount = 0;
   res.locals.followingCount = 0;
   res.locals.followingIdList = [];
   next(); // next 호출해야 다음 라우터가 실행될 수 있음
});

// controller로 분리
// 미들웨어를 라우터에 체이닝으로 연결해 앞단에서 분기해줄 수 있음 (로그인, 미로그인 유무에 따라)
router.get('/profile', isLoggedIn, renderProfileController); // 로그인되어있는 경우 rednerProfileController 실행
router.get('/join', isNotLoggedIn, renderJoinController);
router.get('/', renderMainController);

module.exports = router;