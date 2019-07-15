const getPricesModels = require('../models/getPrices.js');
const dateGmt = require('../../libs/timeGMT.js');

function getPrices(req,res){
    if(!checkParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'})
        return;
    }
    let dataGmt = new dateGmt();
    let context = {
        idPlayer: req.body.idPlayer,
        idPlatform: req.body.idPlatform,
        month : dataGmt.getMonth(),
        year:dataGmt.getYear(),
    }
    getPricesModels(context,(ret)=>{
        if(ret.error){
            res.status(400).send({error: 'ERROR_ON_GET_PRICES'})
        }else{
            res.status(200).send({data:ret.data})
        }
    })

}
module.exports =  getPrices;

function checkParams(params){
    if(isNaN(params.idPlayer)) return false;
    if(isNaN(params.idPlatform)) return false;
    return true;
}