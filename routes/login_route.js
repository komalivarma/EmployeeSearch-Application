const express = require('express');
const router = express.Router();
var logger = require('../util/logger');
const joi=require('express-joi-validator');
const service = require('../services/login_service');

//router.get('/loginEmployee',service.getLoginInfo);
router.get('/loginCheck/:username/:password',service.getLogincheck);
router.post('/login/:username/:password',service.postLogin);

module.exports = router;