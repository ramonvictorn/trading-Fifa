const addPlayerModel = require('../models/addPlayer.js')


function addPlayer(params,cb){
    if(!checkParams(params)){
        cb({error:"INVALID_PARAMS"})
        return
    }

    let context = {
        idFutbin:params.idFutbin,
        name:params.name,
        details: params.details || {},
        category: params.category || 'pattern',
    }
    addPlayerModel(context,(ret)=>{
        if(ret.error){
            // res.status(400).send({error:ret.error})
            cb({error:'ERROR_ADD_PLAYER'})
        }else{
            // res.status(200).send({data:ret.data})
            cb({data:ret.data})
        }
    })
}

/**
 * @returns Returns false if params aren't correct
 * @param {object} params - Params to verify
 */
function checkParams(params){
    if(params.idFutbin == undefined || params.name == undefined) return false;
    return true;
}

module.exports = addPlayer;