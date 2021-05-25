var Munshi = require("../models/munshi.server.model");

exports.create = (req,res,authData) => {
    const deptId = authData.user.deptId;
    const userId = authData.user.userId;

    const { name,email,phone,dateOfBirth,password,status } = req.body;

    if(!(status == "munshi" || status == "user")){
        res.status(500).send("Admin can only create either user or munshi!");
    }

    Munshi.findById(deptId, function (err, myData) {
        if(err){
            res.status(500).send(err);
        }
        else {
            userInfo = {
                
                name: name,
                email: email,
                phone: phone,
                dateOfBirth: dateOfBirth,
                auth:{
                    email:email,
                    password:password,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    token:null
                }
            }
            
            if(myData.data.user.id(userId).status === "Admin"){
                let User = myData.data.user;
                User.push(userInfo);   
                myData.save((err)=>{
                    if(err){
                        res.status(500).send(err);
                    }
                    else {
                        res.json(userInfo)
                    }
                });
            }
            else {
                res.status(500).send("Unauthorized User");
            }
        }
    });
}

exports.read = (req,res,authData) => {
    const deptId = authData.user.deptId;

    Munshi.findById(deptId, function (err, myData) {
        if(err) {
            res.status(500).send(err);
        }
        else {
            let myUser = myData.data.user;
            res.status(200).send(myUser);
        }
    });
}

exports.delete = (req,res,authData)=>{
    const deptId = authData.user.deptId;
    //check to add so, oly admin can delete, no other user can perform this operation.
    Munshi.findById(deptId, function (err, myData) {
        if(err) {
            res.status(500).send(err);
        }
        else {
            let myUser = myData.data.user.id(req.params.id);
            myUser.remove();   
            myData.save((err)=>{
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json("User deleted");
                }
            });
        }
    });

}

exports.customUpdate = (req,res,authData)=>{
    const deptId = authData.user.deptId;
    //check to add so, oly admin can delete, no other user can perform this operation.
    Munshi.findById(deptId, function (err, myData) {
        if(err) {
            res.status(500).send(err);
        }
        else {
            let myUser = myData.data.user.id(req.params.id);

            if(req.body._id)    delete req.body._id;

            for(var p in req.body){
                myUser[p] = req.body[p];
            }

            myData.save((err)=>{
                if(err){
                    res.status(500).send(err);
                }
                else {
                    res.json(myUser);
                }
            });
        }
    });
}

exports.readSingleRecord = (req,res,authData)=>{
    const deptId = authData.user.deptId;

    Munshi.findById(deptId, function (err, myData) {
        if(err) {
            res.status(500).send(err);
        }
        else {
            let myUser = myData.data.user.id(req.params.id);
            res.status(200).send(myUser);
        }
    });
}