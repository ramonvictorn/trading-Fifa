const priceAnalysisModels = require('../models/priceAnalysis.js');
function priceAnalysis(params,cb){
    if(!checkParams(params)){
        cb({error:"INVALID_PARAMS"})
        return
    }

    let context = {
        idPlayer: params.idPlayer,
        idPlatform : params.idPlatform,
        price: params.price,
        
    }
    priceAnalysisModels(context, (ret)=>{
        console.log('priceAnalysisModels Cb')
    })
    
}

/**
 * @returns Returns false if params aren't correct
 * @param {object} params - Params to verify
 */
function checkParams(params){
    console.log('priceAnalysis params ->', params)
    return true;
}

module.exports = priceAnalysis;