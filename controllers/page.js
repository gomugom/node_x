const Post = require('../models/post');
const {Op} = require("sequelize");
const User = require("../models/user");
const HashTag = require("../models/hashtag");

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
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
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

exports.renderHashtagController = async (req, res, next) => {

    const query = req.query.hashtag;
    if (!query) return res.redirect('/');

    try {

        const searchedHashtag = await HashTag.findOne({
            include: [{
                model: Post, // 복수니까 배열로 가져와짐 Posts로
                // attributes: ['id', 'content', 'img'],
                include: [ // include를 중첩으로 할 수 있음
                    {
                        model: User, // Post안에 User도 포함시킴
                    }
                ]
            }],
            where: {
                title: req.query?.hashtag || ''
            }
        });

        let posts = [];

        if (searchedHashtag) {
            posts = searchedHashtag.Posts;
        }

        // 이렇게 해시태그 조회하고 getPosts로 다시 조회해 와도 위와 같은 결과임(근대 굳이 쿼리를 두번 날릴 필요가 있을진...?)
        const hashTagResult = await HashTag.findOne({
            where: {title: req.query?.hashtag || ''}
        });

        posts = await hashTagResult.getPosts({
            include: [{
                model : User
            }]
        });

        return res.render('main', {
            title: `${query} | X`,
            twits: posts,
        });

    } catch (err) {
        return next(err);
    }

}