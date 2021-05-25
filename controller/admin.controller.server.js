var Munshi = require('../models/munshi.server.model');
var pass = require('../_shared/md5.password');

exports.create = (req,res) => {
    const { department, name, email, password, phone } = req.body;
    const admin = "Admin";
    ecodedPassword = pass.strToMd05(password);

    var entry = new Munshi({
        department: department,
        data:{
            user:{
                status:admin,
                name:name,
                email:email,
                phone:phone,
                auth: {
                    email:email,
                    password:password,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    token:null
                }
            }
        }
    });

    entry.save((err)=>{
        if(err){
            if(err.name === "MongoError" && err.code === 11000){
                res.status(500).send("Email already exists\nTry again!");    
            }
            else {
                res.status(500).send(err);
            }
        }
        else {
            res.status(200).send("Department Created Successfully");
        }
    });
}