module.exports = function(req,res,next){
    if(!verifyParams(req.body)){
        res.status(200).send({error:"INVALID_PARAMS"})
        return;
    }
    next();
}
function verifyParams(params){
    if(isNaN(params.futbinId)|| params.futbinId == 0) return false;
    if( isNaN(params.lastXboxPrice)) return false;
    if( isNaN(params.lastOriginPrice)) return false;
    if( isNaN(params.lastPsPrice)) return false;
    return true;
}