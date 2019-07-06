const getWalletModel = require('../models/getWallet.js');

module.exports = getWallet;
function getWallet(req,res){
    if(!checkParams(req)){
        res.status(400).send({error:'INVALID_PARAMS'})
    }
    let context = {
        idPlatform : parseInt(req.body.idPlatform),
        idUser: req.session.user.idUser,
        offset : req.body.offset,
        qtd : req.body.qtd,
    }
    getWalletModel(context,(dataReturned)=>{
        if(dataReturned.error){
            res.status(400).send({error:'ERRO_ON_GET_WALLET_'})
        }else{
            res.status(200).send({data:dataReturned.data})
        }
    })

}


function checkParams(params){
    if(isNaN(params.body.idPlatform)) return false;
    if(isNaN(params.session.user.idUser)) return false;
    return true;
}