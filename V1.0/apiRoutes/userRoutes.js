let router = require('express').Router();
const {
    createUser,
    checkLogin,
    generateForgotPasswordLink,
    resetPasswordPage,
    followUser,
    unfollowUser,
    profiledata,
    followersData
} = require('../contoller/userController');
const {protects} = require('../authController');

router.route("/createuser").post(createUser);
router.route("/login").post(checkLogin);
router.route("/forgotpassword").post(generateForgotPasswordLink);
router.route("/resetpassword").post(resetPasswordPage);
router.route("/followuser").post(protects,followUser);
router.route("/unfollowuser").post(protects,unfollowUser);
router.route("/profiledata").get(protects,profiledata);
router.route("/followersdata").post(protects,followersData);

module.exports = router;