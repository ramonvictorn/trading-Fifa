module.exports = function(req,res,next){
    if(!verifyParams(req.body)){
        res.status(400).send({error:"INVALID_PARAMS"})
        return;
    }
    next();
}
function verifyParams(params){
    if(isNaN(params.futbinId)|| params.futbinId == 0) return false;
    if( isNaN(params.lastXboxPrice) || parseInt(params.lastXboxPrice) == 0) return false;
    if( isNaN(params.lastOriginPrice) || parseInt(params.lastOriginPrice) == 0) return false;
    if( isNaN(params.lastPsPrice) || parseInt(params.lastPsPrice) == 0) return false;
    return true;
}