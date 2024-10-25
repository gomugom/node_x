const User = require('../models/user')
const bcrypt = require('bcrypt');
const passport = require('passport');

// 회원가입 라우터
exports.joinController = async (req, res, next) => {

    const { nick, email, password } = req.body; // express.urlencoded, express.json을 통해 받아올 수 있게 됨

    // 기가입자 확인
    const existUser = await User.findOne({
        where: {
            email
        }
    });

    if (existUser) { // 기가입 사용자
        // 가입페이지로 리다이렉트(302)
        return res.redirect(`/join?error=${email}`);
    }

    // 사용자 생성
    const hashedPassword = await bcrypt.hash(password, 12);

    try {

        User.create({
            email,
            nick,
            password: hashedPassword // 암호화 필요
        });

    } catch (err) {
        console.error(err);
        next(err); // 에러처리 미들웨어로 분기
    }

    // 생성까지 완료됐으면 다시 로그인할 수 있도록 메인으로 이동
    return res.redirect('/');

}

// 로그인 컨트롤러
exports.loginController = (req, res, next) => {
    // authenticate의 첫번째 인자가 strategy 이름
    passport.authenticate('local', () => {
        req.login();
    });
}

exports.logoutController = (req, res, next) => {

}