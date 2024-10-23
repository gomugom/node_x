exports.renderProfileController = (req, res, next) => {
    // res.locals와 아래 {title} 부분 같이 view 파일로 넘어감
    res.render('profile', { title: '내 정보 - X' }); // profile.html
};
exports.renderJoinController = (req, res, next) => {
    res.render('join', { title: '회원 가입 - X' }); // join.html
};
exports.renderMainController = (req, res, next) => {
    res.render('main', { title: 'X', twits: [], }); // main.html
};
