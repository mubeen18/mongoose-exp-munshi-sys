const express = require('express');
var router = express.Router();
var eventCtrl = require('../controller/event.controller.server');
const verifyToken = require('../_shared/jwt.token.validate');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

router.get('/',(req,res)=>{
    return eventCtrl.read(req,res);
})

router.post('/',(req,res)=>{
    return eventCtrl.create(req,res);
})

module.exports = router;