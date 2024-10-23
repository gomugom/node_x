const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const { sequelize } = require('./models/db');
const dbConfig = require('./models');

dotenv.config(); // process.env

// router 설정은 ./routes/page.js에서 설정
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev')); // dev : 자세한 개발용 로그, combined : 상용 배포용(간단한 로그)
// static 정적 파일 설정
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // json 요청 허용
app.use(express.urlencoded({extended: false})); // form 요청 허용
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 처리용
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false, // https 처리 적용하게 되면 true로 변경
    }
}));

app.use('/', pageRouter);

// 404 not found
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error); // error처리 미들웨어로감
});

// error 처리용 
app.use((err, req, res, next) => {
    // locals : 지역변수 저장 => pug, nunjucks 템플릿에서 변수로 받아오기 위해 사용
   res.locals.message = err.message;
   res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 상용에선 무슨 오류인지 알 수 없게
    // 에러 로그를 서비스한테 넘긴다.
   res.status(err.status || 500);
   res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')} server is running...`);
});