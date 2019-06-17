const getRankingVariationLowPriceModel = require('../models/getRankingVariationLowPrice.js');

module.exports = getRankingVariationLowPrice;
function getRankingVariationLowPrice(req,res){
    if(!checkParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'})
    }
    let context = {
        idPlatform : req.body.idPlatform,
        offset : req.body.offset || 0,
        qtd : req.body.qtd || 10,
    }
    getRankingVariationLowPriceModel(context,(dataReturned)=>{
        if(dataReturned.error){
            res.status(400).send({error:'ERRO_ON_GET_RANKING'})
        }else{
            res.status(200).send({data:dataReturned.data})
        }
    })

}


function checkParams(params){
    if(isNaN(params.idPlatform)) return false;
    return true;
}