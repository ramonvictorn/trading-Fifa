const getPlatformModel = require('../models/getPlatform.js')


function getPlatform(params,cb){
    if(!checkParams(params)){
        cb({error:"INVALID_PARAMS"})
        return
    }

    let context = {
        name: params.name,
        idPlatform: params.idPlatform,
    }
    getPlatformModel(context,(ret)=>{
        if(ret.err){
            // res.status(400).send({error:ret.error})
            cb({error:'ERROR_ON_GET_PLATFORM'});
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
    if(params.name == undefined && params.idPlatform == undefined) return false;
    return true;
}

module.exports = getPlatform;