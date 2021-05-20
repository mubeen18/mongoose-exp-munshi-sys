var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller.server');

router.get('/',(req,res)=>{
    return userCtrl.read(req,res);
})

router.post('/',(req,res)=>{
    return userCtrl.create(req,res);
})

module.exports = router;