var Munshi = require("../models/munshi.server.model");

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
    var query = req.query;
    
    Munshi.find(query,(err,data)=>{
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.json(data);
        }
    });
}