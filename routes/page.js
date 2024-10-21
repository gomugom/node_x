const express = require('express');

const router = express.Router();
const { renderJoin, renderMain, renderProfile } = require('../controllers/page');

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
router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);

module.exports = router;