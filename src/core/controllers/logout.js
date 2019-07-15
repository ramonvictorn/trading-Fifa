function logout(req,res){
    if(!checkParams(req.body)){
        res.status(400).send({error:"INVALID_PARAMS"})
        return
    }
    if(req.session && req.session.user && req.session.user.idUser != undefined){
        console.log('destoy session true')
        req.session.destroy();
        res.status(200).send({data:'LOGOUT_SUCESS'})
    }else{
        res.status(400).send({error:'SESSION_NOT_FOUND'})
    }
}

/**
 * @returns Returns false if params aren't correct
 * @param {object} params - Params to verify
 */
function checkParams(params){
    return true;
}

module.exports = logout;