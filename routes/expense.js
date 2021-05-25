const express = require('express');
const router = express.Router();
const expenseCtrl = require('../controller/expense.controller.server');
const verifyToken = require('../_shared/jwt.token.validate');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

router.get('/',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return expenseCtrl.read(req,res,authData);     
        }
    });
})

router.post('/',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return expenseCtrl.create(req,res,authData);   
        }
    });
    
})  

router.get('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err) {
            res.status(403).send(err);
        }
        else {
            return expenseCtrl.readSingleRecord(req,res,authData);     
        }
    });
})

router.patch('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.status(403).send(err);
        }
        else {
            return expenseCtrl.customUpdate(req,res,authData);
        }
    })
})

router.put('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.status(403).send(err);
        }
        else {
            return expenseCtrl.update(req,res,authData);
        }
    })
})

router.delete('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token,config.secret,(err,authData)=>{
        if(err){
            res.status(403).send(err);
        }
        else {
            return expenseCtrl.delete(req,res,authData);
        }
    })
})


module.exports = router;