var Munshi = require("../models/munshi.server.model");

exports.read = (req,res,authData) => {
    const deptId = authData.user.deptId;
    const userId = authData.user.userId;

    Munshi.findById(deptId, function (err, myData) {
        if(err){
            res.status(500).send(err);
        }
        else {
            let events = myData.data.user.id(userId).events;
            res.status(200).send(events);
        }
    });
}

exports.create = (req,res,authData) => {
    const { title, totalAmount, pendingAmount, paidAmount } = req.body;
    
    const deptId = authData.user.deptId;
    const userId = authData.user.userId;

    const event = {
        title: title,
        totalAmount: totalAmount,
        pendingAmount: pendingAmount,
        paidAmount: paidAmount,
        date: Date.now(),
    }

    Munshi.findById(deptId, function (err, myData) {
        if(err){
            res.status(200).send(err);
        }
        else {
            let events = myData.data.user.id(userId).events;
            events.push(event);   
            myData.save((err)=>{
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json(events)
                }
            });
        }
    });
}

exports.delete = (req,res,authData) => {
    const deptId = authData.user.deptId;
    const userId = authData.user.userId;

    Munshi.findById(deptId, function (err, myData) {
        if(err){
            res.status(500).send(err);
        }
        else {
            let events = myData.data.user.id(userId).events.id(req.params.id);
            console.log(events);
            events.remove();   
            myData.save((err)=>{
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json("Event removed");
                }
            });
        }
    });
}


exports.customUpdate = (req,res,authData) => {
    const deptId = authData.user.deptId;
    const userId = authData.user.userId;

    Munshi.findById(deptId, function (err, myData) {
        if(err){
            res.status(500).send(err);
        }
        else {
            let myEvent = myData.data.user.id(userId).events.id(req.params.id);
            if(req.body._id)    delete req.body._id;

            for(var p in req.body){
                myEvent[p] = req.body[p];
            }

            myData.save((err)=>{
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json(myEvent);
                }
            });
        }
    });
}