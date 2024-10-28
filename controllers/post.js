exports.afterUploadImageController = (req, res, next) => {
    console.log(`afterUploadImageController`);
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

// 게시글 업로드
exports.uploadPostController = (req, res, next) => {
    console.log(`uploadPostController`);
    try {

    } catch (error) {
        next(error);
    }
};