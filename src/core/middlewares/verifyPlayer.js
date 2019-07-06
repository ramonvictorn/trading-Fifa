let players = {};

const verifyPlayeModel = require('../models/getPlayer.js');
const addPlayerModel = require('../models/addPlayer.js');

module.exports = function(req,res,next){
    //verificando no obj
    if(players[req.body.futbinId] != undefined){
        req.body.idPlayer = players[req.body.futbinId];
        next();
        return;
    }

        verifyPlayeModel(req.body,(dataReturned)=>{
        if(dataReturned.error){
            res.status(400).send({error:'ERRON_ON_VERIFY_PLAYER'})
            return;
        }

        if(dataReturned.data != undefined && dataReturned.data.idPlayer != undefined){
            players[req.body.futbinId] = dataReturned.data.idPlayer;
            req.body.idPlayer = dataReturned.data.idPlayer;
            next();
            return;
        }else{
            addPlayerModel(req.body,(dataReturned)=>{
                if(dataReturned.error){
                    res.status(400).send({error:'ERRON_ON_ADD_PLAYER'})
                    return true;
                }

                players[req.body.futbinId] = dataReturned.data.idPlayer;
                req.body.idPlayer = dataReturned.data.idPlayer;
                next();
                return
            })
        }
    })
}
