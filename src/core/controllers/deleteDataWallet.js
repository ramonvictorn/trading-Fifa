const deleteDataWalletModel = require('../models/deleteDataWallet.js');

function deleteDataWallet(req,res){
    if(!checkParams(req.body)){
        res.status(400).send({error:"INVALID_PARAMS"})
        return
    }

    let context = {
        idUser : req.session.user.idUser,
        idBuy: req.body.idBuy,
    }
    deleteDataWalletModel(context,(ret)=>{
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
    if(isNaN(params.idBuy)) return false;
    return true;
}

module.exports = deleteDataWallet;