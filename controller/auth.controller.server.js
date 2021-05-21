const Munshi = require("../models/munshi.server.model");
const jwt = require('jsonwebtoken');

exports.register = (req,res) => {
    /* const { name, email, password, phone } = req.body; */

    Munshi.findOne({data:{ user: { email: 'mu.sddffj@d.com' }}},(err,data)=>{
        err ? console.log(err) : console.log(data);
    })

    /* var entry = new Munshi({
        
    });
    entry.save(); */

    res.status(200).send("mubeen");
}


exports.login = (req,res) => {
    const { email,password } = req.body;

    Munshi.findOne({ 'data.user.auth.email': email, 'data.user.auth.password': password }, (err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else {
            if (data === null) {
                res.status(500).send("Email or password doesn't matched");
            }
            else {
                let resp = data.data.user.filter(x => x.email === email)[0];
                const user = {
                    deptId: data.id,
                    userId: resp.id,
                    name: resp.name,
                    email: resp,email,
                    department:data.department
                }

                jwt.sign({user},'secretkey',{expiresIn:"30 sec"},(err,token)=>{
                    res.json({token})
                })
            }
        }
    })
}