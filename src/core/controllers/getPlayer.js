const getPlayerModels = require('../models/getPlayer.js')


function getPlayer(params,cb){
    if(!checkParams(params)){
        res.status(400).send({error:"INVALID_PARAMS"})
        return
    }

    let context = {
        idFutbin: params.idFutbin,
    }
    getPlayerModels(context,(ret)=>{
        if(ret.err){
            // res.status(400).send({error:ret.error})
            cb({error:'ERROR_ON_GET_PLAYER'});
        }else{
            // res.status(200).send({data:ret.data})
            cb({data:ret.data});
        }
    })
}

/**
 * @returns Returns false if params aren't correct
 * @param {object} params - Params to verify
 */
function checkParams(params){
    if(params.idPlayer == undefined && params.idFutbin == undefined) return false;
    return true;
}

module.exports = getPlayer;