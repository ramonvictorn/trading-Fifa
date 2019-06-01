const loginModels = require('../models/login.js');

function login(req,res){
    if(!checkParams(req.body)){
        res.status(200).send({error:"INVALID_PARAMS"})
        return
    }

    let context = {
        login:req.body.login,
        password:req.body.password,
    }
    loginModels(context,(ret)=>{
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
    if(params.login == undefined || params.password == undefined) return false;
    return true;
}

module.exports = login;