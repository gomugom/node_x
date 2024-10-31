const Post = require('../models/post');
const {Op} = require("sequelize");

exports.renderProfileController = (req, res, next) => {
    // res.locals와 아래 {title} 부분 같이 view 파일로 넘어감
    res.render('profile', { title: '내 정보 - X' }); // profile.html
};
exports.renderJoinController = (req, res, next) => {
    res.render('join', { title: '회원 가입 - X' }); // join.html
};
exports.renderMainController = async (req, res, next) => {

    // Main 이동시 로그인중이면 Post 조회
    let posts = [];

    if (req.user) { // req.user => passport user 객체(저장은 serialize에서 가져오는건 deserialize에서)
        posts = await Post.findAll({
            where: { // 내 게시물이 아닌걸 피드에 조회
                UserId: {
                    [Op.ne]: req.user.id
                }
            },
            order: [['createdAt', 'DESC']],
        })
    }

    res.render('main', { title: 'X', twits: posts, }); // main.html

};
