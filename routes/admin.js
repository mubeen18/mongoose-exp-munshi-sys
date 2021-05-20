const express = require('express');
const router = express.Router();
const adminCtrl = require('../controller/admin.controller.server');

/* router.get('/',(req,res)=>{
    return adminCtrl.read(req,res);
}) */

router.post('/',(req,res)=>{
    return adminCtrl.create(req,res);
})

module.exports = router;