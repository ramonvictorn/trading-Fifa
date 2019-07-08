const addNewDataOnWalletModel = require('../models/addNewDataOnWallet.js');


function addNewDataOnWallet(req,res){
    if(!checkParams(req.body)){
        res.status(400).send({error:"INVALID_PARAMS"})
        return
    }

    let context = {
        idUser:req.session.user.idUser,
        idPlayer:req.body.idPlayer,
        idPlatform: req.body.idPlatform,
        price: req.body.price,
    }
    addNewDataOnWalletModel(context,(ret)=>{
        if(ret.error){
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
    if(params.idPlayer == undefined || params.idPlatform == undefined) return false;
    if(isNaN(params.price)) return false;
    return true;
}

module.exports = addNewDataOnWallet;