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