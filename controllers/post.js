const Post = require('../models/post');
const Hashtag = require('../models/hashtag');

exports.afterUploadImageController = (req, res, next) => {
    console.log(`afterUploadImageController`);
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

// 게시글 업로드
exports.uploadPostController = async (req, res, next) => {

    try {

        const { content, url } = req.body;

        // 게시글 생성
        const newPost = await Post.create({
            content,
            img: url,
            UserId: req.user.id,
        });

        // hashtag 판별
        const hashTags = content.match(/#[^\s#]*/g);

        const hashTagsPromises = hashTags.map(element => {
            const tag = element.slice(1).toLowerCase(); // # 제거
            // hashtag 생성(있으면 생성 x)
            return Hashtag.findOrCreate({
                where: {
                    title: tag,
                }
            });
        });

        const hashTagsResult = await Promise.all(hashTagsPromises);

        const hashTagList = hashTagsResult.map(e => e[0]);

        await newPost.addHashtags(hashTagList); // post 와 hashtag 관계 설정

        // main으로 403 redirect
        res.redirect('/');

    } catch (error) {
        next(error);
    }

};