const getAllPlayersModels = require('../models/getAllPlayers.js')


function getAllPlayers(req,res){
    console.log('getAllPlayersController')
    getAllPlayersModels((ret)=>{
        if(ret.err){
            res.status(400).send({error:ret.error})
        }else{
            res.status(200).send({data:ret.data})
        }
    })
}


module.exports = getAllPlayers;