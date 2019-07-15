const getLastPlatformPriceModel = require('../models/getLastPlatformPrice.js');

function getLastPlatformPrice(req,res){
    if(!checkParams(req.body)){
        res.status(400).send({error:"INVALID_PARAMS"})
        return
    }
    let context = {
        idPlayer: req.body.idPlayer,
        idPlatform: req.body.idPlatform,
    }

    getLastPlatformPriceModel(context,(ret)=>{
        if(ret.err){
            res.status(400).send({error:ret.error})
        }else{
            res.status(200).send({data:ret.data})
        }
    })
}

/**
 * @returns Returns false if params aren't correct
 * @param {object} params - Params to verify
 */
function checkParams(params){
    if(isNaN(params.idPlayer) || isNaN(params.idPlatform)) return false;
    return true;
}

module.exports = getLastPlatformPrice;