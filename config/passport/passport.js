/* [ passport 관련 설정 ] */

const passport = require('passport');
const localStrategy = require('./localStrategy');
const User = require('../../models/user');

/*
* [ passport 로그인 흐름(FLOW) ]
* 1. /auth/login 라우터를 통해 로그인 요청이 들어옴.
* 2. 라우터에서 passport.authenticate 메서드 호출
* 3. passport.authenticate가 로그인 전략(LocalStrategy) 수행
*   - 사용자 로그인해줘도 되는지 유무 판별(패스워드 검사 등...)
* 4. 로그인 인증 성공시(strategy에서 done호출) 사용자 정보 객체와 함께 passport.authenticate의 콜백함수가 실행되고
*    그 안에서 req.login() 호출
* 5. req.login 메서드가 passport.serializeUser 호출
* 6. req.session에 사용자 아이디만 저장해서 세션 생성
*   - app.use(passport.session()) 부분에서 세션에 저장됨
* 7. express-session에 설정된 대로 브라우저에 connect.sid 세션 쿠키 전송
*   connect.sid라는 이름으로 세션 쿠키가 브라우저로 전송
* 8. 로그인 완료
* */

module.exports = () => {

    // Passport Local 전략 설정
    localStrategy();

    // 사용자 직렬화/역직렬화
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
       User.findOne({
           where: {
               id,
           }
       }).then((user) => {
           done(null, user);
       }).catch((err) => {
           done(err);
       })
    });

}