
module.exports = function(req,res,next){
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader);
    if(typeof(bearerHeader !== undefined))              //need to work on that token
    {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();
    }
    else {
        res.sendStatus(403);
    }
}