function isLogged(req,res){
    if(!checkParams(req.body)){
        res.status(400).send({error:"INVALID_PARAMS"})
        return
    }
    if(req.session && req.session.user && req.session.user.idUser != undefined){
        res.status(200).send({data:true})
    }else{
        res.status(200).send({data:false})
    }
}

/**
 * @returns Returns false if params aren't correct
 * @param {object} params - Params to verify
 */
function checkParams(params){
    return true;
}

module.exports = isLogged;