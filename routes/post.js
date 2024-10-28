const express = require('express');
const router = express.Router();
const { afterUploadImageController, uploadPostController } = require('../controllers/post');
const { isLoggedIn } = require("../middlewares");
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// uploads 폴더 유무를 파악해 없을 경우 생성
try {
    fs.readdirSync('uploads');
} catch (err) {
    fs.mkdirSync('uploads');
}

// 파일 저장 위치 및 파일 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 파일이 저장될 디렉터리
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // 이미지명20241028.png
    },
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB
    }
});

// Multer 초기화
const upload = multer({ storage: storage });

// 설정을 다르게 하기 위해 multer를 하나 더 생성함
const upload2 = multer();

// [ 이미지 업로드 ]
// 이미지 하나일 경우 upload.single
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImageController);

// [ 게시글 업로드 ]
// upload.none() => form에 파일이 있어도 무시하고 텍스트 필드만 처리함(파일 관련 오류 발생해도 상관없음)
router.post('/', isLoggedIn, upload2.none(), uploadPostController);

module.exports = router;