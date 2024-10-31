const User = require('../models/user');

exports.followController = async (req, res, next) => {

    try {

        const followingTargetUser = await User.findOne({
            where: {
                id: req.params.id, // 팔로우할 사용자 id
            }
        });

        if (!followingTargetUser) {
            return res.status(404).send('not found user');
        }

        await followingTargetUser.addFollowers(req.user.id);

        res.send('success');

    } catch (err) {
        next(err);
    }

}