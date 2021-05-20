var Munshi = require("../models/munshi.server.model");

exports.create = (req,res) => {
    var entry = new Munshi({
        
    });
    entry.save();

    res.send(200,"data submitted");
}

exports.read = (req,res) => {
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