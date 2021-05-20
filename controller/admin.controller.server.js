var Munshi = require('../models/munshi.server.model');

exports.create = (req,res) => {
    var entry = new Munshi(req.body);
    
    entry.save((err)=>{
        if(err){
            res.status(500).send(err);
        }
        else {
            res.json(req.body);
        }
    });
}