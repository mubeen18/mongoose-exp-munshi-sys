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
            return userCtrl.read(req,res,authData);     
        }
    });
})

router.post('/',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return userCtrl.create(req,res,authData);     
        }
    });
})

router.delete('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.status(403).send(err);
        }
        else {
            return userCtrl.delete(req,res,authData);
        }
    })
})

router.patch('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.status(403).send(err);
        }
        else {
            return userCtrl.customUpdate(req,res,authData);
        }
    })
})

module.exports = router;