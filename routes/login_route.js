const express = require('express');
const router = express.Router();
var logger = require('../util/logger');
const joi=require('express-joi-validator');
const service = require('../services/login_service');

router.post('/loginEmployee',service.getLogincheck);

module.exports = router;