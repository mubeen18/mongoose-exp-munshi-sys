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

router.get('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return eventCtrl.readSingleRecord(req,res,authData);     
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

router.delete('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return eventCtrl.delete(req,res,authData);
        }
    })
})

router.patch('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return eventCtrl.customUpdate(req,res,authData);
        }
    })
})



module.exports = router;