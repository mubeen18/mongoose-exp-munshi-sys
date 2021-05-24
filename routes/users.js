var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller.server');
const verifyToken = require('../_shared/jwt.token.validate');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

router.get('/',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return userCtrl.read(req,res);
        } 
    });
    return userCtrl.read(req,res);
})

router.post('/',(req,res)=>{
    return userCtrl.create(req,res);
})

module.exports = router;