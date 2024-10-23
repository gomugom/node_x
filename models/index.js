const User = require('./user');
const Post = require('./post');
const HashTag = require('./hashtag');
const {sequelize} = require("./db");

// 관계 생성
// User : Post = 1: N
User.hasMany(Post);
Post.belongsTo(User);

// 사용자 : 사용자 = N : M (팔로잉 관계)
User.belongsToMany(User, { // 팔로워
    foreignKey: 'followingId',
    as: 'Followers',
    through: 'Follow' // 중간테이블
});

User.belongsToMany(User, { // 팔로잉
    foreignKey: 'followerId',
    as: 'Followings',
    through: 'Follow',
});

sequelize.sync({force: false, alter: true}).then(() => console.log('db connection success')).catch((err) => console.error('DB connection Fail'));

module.exports = {
    User,  Post,  HashTag,
}