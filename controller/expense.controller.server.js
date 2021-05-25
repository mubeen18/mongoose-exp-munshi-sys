const Munshi = require("../models/munshi.server.model");

exports.read = (req,res,authData) => {
    const deptId = authData.user.deptId;

    Munshi.findById(deptId, function (err, myData) {
        if(err){
            res.status(500).send(err);
        }
        else {
            let myExpense = myData.data.expense;
            res.status(200).send(myExpense);
        }
    });
}

exports.create = (req,res,authData) => {
    const { title, amount, paymentBy, description } = req.body;
    const deptId = authData.user.deptId;

    const expense = {
        title: title,
        amount:amount,
        date: Date.now(),
        paymentBy: paymentBy,
        description:description,
    }

    Munshi.findById(deptId, function (err, myData) {
        if(err){
            res.status(500).send(err);
        }
        else {
            let myExpense = myData.data.expense;
            myExpense.push(expense);   
            myData.save((err)=>{
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json(expense);
                }
            });
        }
    });
}

exports.customUpdate = (req,res,authData)=> {
    const deptId = authData.user.deptId;

    Munshi.findById(deptId, function (err, myData) {
        if(err){
            res.status(500).send(err);
        }
        else {
            let myExpense = myData.data.expense.id(req.params.id);
            if(req.body._id)    delete req.body._id;

            for(var p in req.body){
                myExpense[p] = req.body[p];
            }

            myData.save((err)=>{
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json(myExpense);
                }
            });
        }
    });
}

exports.update = (req,res,authData)=> {
    
}

exports.delete = (req,res,authData)=> {
    const deptId = authData.user.deptId;

    Munshi.findById(deptId, function (err, myData) {
        if(err){
            res.status(500).send(err);
        }
        else {
            let myExpense = myData.data.expense.id(req.params.id);
            myExpense.remove();   
            myData.save((err)=>{
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json("Expense removed");
                }
            });
        }
    });
}