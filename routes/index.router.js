const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

router.post('/register', ctrlUser.register);
router.post('/loginUser', ctrlUser.loginUser);
router.get('/userInfo', ctrlUser.userInfo);

module.exports = router;