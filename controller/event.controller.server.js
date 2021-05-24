var Munshi = require("../models/munshi.server.model");

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

exports.create = (req,res) => {
    const { title, totalAmount, pendingAmount, paidAmount } = req.body;
    const deptId = "60a674df72bfb697ca88429d";
    const userId = "60a674df72bfb697ca88429e";
    const event = {
        title: title,
        totalAmount: totalAmount,
        pendingAmount: pendingAmount,
        paidAmount: paidAmount,
        data: Date.now(),
    }

    /* Munshi.findById(deptId, function (e, myData) {
        if (e) console.log(e);
        let events = myData.data.user.id(userId);

        events.push({events: event});

        console.log(events);
        res.status(200).send(events);
        myData.save();

    }); */


    Munshi.findById(deptId, function (e, myData) {
        if (e) console.log(e);
        let events = myData.data.user.id(userId).events;
        
        events.push({title:"sdf",totalAmount:3434});

        console.log(events);
        res.status(200).send(events);
        myData.save();

    });

}