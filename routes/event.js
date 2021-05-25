const express = require('express');
var router = express.Router();
var eventCtrl = require('../controller/event.controller.server');
const verifyToken = require('../_shared/jwt.token.validate');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

router.get('/',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return eventCtrl.read(req,res,authData);     
        }
    });
})

router.post('/',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return eventCtrl.create(req,res,authData);     
        }
    });
})

module.exports = router;