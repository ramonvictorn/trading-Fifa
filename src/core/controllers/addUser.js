const addUserModel = require('../models/addUser.js');

function addUser(req,res){
    if(!checkParams(req.body)){
        res.status(200).send({error:"INVALID_PARAMS"})
        return
    }

    let context = {
        name:req.body.name,
        login:req.body.login,
        password:req.body.password,
        details: req.body.details || {},
    }
    addUserModel(context,(ret)=>{
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
    if(params.name == undefined || params.password == undefined) return false;
    if(params.login == undefined ) return false;
    return true;
}

module.exports = addUser;