const addPricePlayerModel = require('../models/addPricePlayer.js')
const timeGMT = require('../../libs/timeGMT.js')

function addPricePlayer(params,cb){
    // console.log("testParams addPricePlayer ", params.idPlatform)
    let dateGMT = new timeGMT();
    if(!checkParams(params)){
        cb({error:"INVALID_PARAMS"})
        return
    }
    let context = {
        idPlayer: params.idPlayer,
        day: dateGMT.getDay(),
        month: dateGMT.getMonth(),
        year: dateGMT.getYear(),
        hour:dateGMT.getHour(),
        minutes:dateGMT.getMinutes(),
        details: params.details || {},
        category: params.category || 'pattern',
        id_platform : params.idPlatform,
        price: parseInt(params.price),
    }
    
    addPricePlayerModel(context,(ret)=>{
        if(ret.error){
            // res.status(400).send({error:ret.error})
            cb({error:'ERRO_ON_ADD_PRICE_PLAYER'})
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
    if(params.idPlayer == undefined){
        return false;
    } 
    if(params.price == undefined){
        return false;
    }
    return true;
}

module.exports = addPricePlayer;