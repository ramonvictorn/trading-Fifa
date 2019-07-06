module.exports = verifySession;
function verifySession(req,res,next){
    if(req.session.user == undefined || isNaN(req.session.user.idUser)){
        return res.status(400).send({error:'NOT_PERMITED'})
    }
    next();
}