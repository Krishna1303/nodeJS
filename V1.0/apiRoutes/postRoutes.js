let router = require('express').Router();
const {createPost} = require('../contoller/postController');

const {protects} = require('../authController');


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/createpost',protects,upload.array('photo'),createPost);

module.exports = router;