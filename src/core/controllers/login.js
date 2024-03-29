const loginModels = require('../models/login.js');

function login(req,res){
    if(!checkParams(req.body)){
        res.status(400).send({error:"INVALID_PARAMS"})
        return
    }

    let context = {
        login:req.body.login,
        password:req.body.password,
    }
    console.log('Login -> ', context.login)
    loginModels(context,(ret)=>{
        console.log('oi cb ', ret)
        if(ret.error){
            res.status(400).send({error:ret.error})
        }else{
            console.log('elsee', ret)
            req.session.user = {...ret.data}
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