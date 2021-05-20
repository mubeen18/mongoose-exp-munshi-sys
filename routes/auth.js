const express = require('express');
const router = express.Router();
const authCtrl = require('../controller/auth.controller.server');

router.post('/register',(req,res)=>{
    return authCtrl.register(req,res)
})

router.post('/login',(req,res)=>{
    return authCtrl.login(req,res);
})

module.exports = router;