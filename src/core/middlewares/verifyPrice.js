const addPricePlayerModel = require('../models/addPricePlayer.js');
const GMTdate = require('../../libs/timeGMT.js');
const logger = require('../../libs/logger.js');
const getLastPlatformPriceModel = require('../models/getLastPlatformPrice.js');
let pricesPlayers = {};
let contador = 1;
module.exports  = verifyPrice;
function verifyPrice(req,res){
    function done(code,msg){
        if(code == 400){
            res.status(code).json({error:msg});
            return;
        }else{
            res.status(code).json({data:msg});
            return;
        }
    }
    logger.log('verifyPrice ', contador++);
    let donesLastPrice = 0;
    let needUpdate = [];

    if(pricesPlayers[req.body.futbinId] != undefined){

        if(pricesPlayers[req.body.futbinId]['lastXboxPrice'] =! req.body.lastXboxPrice){
            needUpdate.push({price:req.body.lastXboxPrice, idPlatform: 1, idPlayer: req.body.idPlayer})
        }
        if(pricesPlayers[req.body.futbinId]['lastPsPrice'] =! req.body.lastPsPrice){
            needUpdate.push({price:req.body.lastPsPrice, idPlatform: 2,idPlayer: req.body.idPlayer})
        }
        if(pricesPlayers[req.body.futbinId]['lastOriginPrice'] =! req.body.lastOriginPrice){
            needUpdate.push({price:req.body.lastOriginPrice, idPlatform: 3, idPlayer: req.body.idPlayer})
        }   

        update();
    }else{
        getLastPlatformPriceModel({idPlatform: 1, idPlayer:req.body.idPlayer},(dataReturned)=>{
            // console.log('getLastPlatformPriceModel ', dataReturned)
            if(!dataReturned.data ||  dataReturned.data.price != req.body.lastXboxPrice){
                needUpdate.push({price:req.body.lastXboxPrice, idPlatform: 1,idPlayer: req.body.idPlayer})
            }
            donesLastPrice++;
            if(donesLastPrice == 3){
                logger.log(' call 3')
                update();
            }
        })
        getLastPlatformPriceModel({idPlatform: 2, idPlayer:req.body.idPlayer},(dataReturned)=>{
            // console.log('getLastPlatformPriceModel ', dataReturned)
            if(!dataReturned.data ||  dataReturned.data.price != req.body.lastPsPrice){
                needUpdate.push({price:req.body.lastPsPrice, idPlatform: 2,idPlayer: req.body.idPlayer})
            }
            donesLastPrice++;
            if(donesLastPrice == 3){
                logger.log(' call 2')
                update();
            }
        })
        getLastPlatformPriceModel({idPlatform: 3, idPlayer:req.body.idPlayer},(dataReturned)=>{
            // console.log('getLastPlatformPriceModel ', dataReturned)
            if(!dataReturned.data ||  dataReturned.data.price != req.body.lastOriginPrice){
                needUpdate.push({price:req.body.lastOriginPrice, idPlatform: 3,idPlayer: req.body.idPlayer})
            }
            donesLastPrice++;
            if(donesLastPrice == 3){
                logger.log(' call 1')
                update();
            }
        })
        
    }

    function update(){
        let cbs = 0;
        let dateGmt = new GMTdate();
        logger.log(' UPDADEEE');
        if(needUpdate.length == 0){
            logger.log('res.send 1');
            // res.status(200).send({data:'PRICES_NOT_CHANGEDS'});
            done(200,'PRICES_NOT_CHANGEDS')
            return;
        }else{
            let day = dateGmt.getDay();
            let month = dateGmt.getMonth();
            let year = dateGmt.getYear();
            let hour = dateGmt.getHour();
            let minutes = dateGmt.getMinutes();
            for(var cont = 0; cont < needUpdate.length; cont++){
                addPricePlayerModel(
                    {
                    day,
                    month,
                    year,
                    hour,
                    minutes,
                    price: needUpdate[cont]['price'],
                    idPlatform: needUpdate[cont]['idPlatform'],
                    idPlayer : req.body.idPlayer,
                },(dataReturned)=>{
                    cbs++;
                    pricesPlayers[req.body.futbinId] = {};
                    if(dataReturned.data.idPlatform == 1){
                        //xbox
                        pricesPlayers[req.body.futbinId]['lastXboxPrice'] =dataReturned.data.price; 
                    }
                    if(dataReturned.data.idPlatform == 2){
                        //ps
                        pricesPlayers[req.body.futbinId]['lastPsPrice'] =dataReturned.data.price; 
                    }
                    if(dataReturned.data.idPlatform == 3){
                        //origin
                        pricesPlayers[req.body.futbinId]['lastOriginPrice'] = dataReturned.data.price; 
                    }
                    if(needUpdate.length == cbs){
                        logger.log('res.send 2');
                        done(200,'SUCESS');
                    }
                })
            }
        }
    }
}
        // function update(req,res,needUpdate){
        //     let cbs = 0;
        //     let dateGmt = new GMTdate();
        //     logger.log(' UPDADEEE');
        //     if(needUpdate.length == 0){
        //         logger.log('res.send 1');
        //         res.status(200).send({data:'PRICES_NOT_CHANGEDS'});
        //         // return;
        //     }else{
        //         let day = dateGmt.getDay();
        //         let month = dateGmt.getMonth();
        //         let year = dateGmt.getYear();
        //         let hour = dateGmt.getHour();
        //         let minutes = dateGmt.getMinutes();
        //         for(var cont = 0; cont < needUpdate.length; cont++){
        //             addPricePlayerModel(
        //                 {
        //                 day,
        //                 month,
        //                 year,
        //                 hour,
        //                 minutes,
        //                 price: needUpdate[cont]['price'],
        //                 idPlatform: needUpdate[cont]['idPlatform'],
        //                 idPlayer : req.body.idPlayer,
        //             },(dataReturned)=>{
        //                 cbs++;
        //                 pricesPlayers[req.body.futbinId] = {};
        //                 if(dataReturned.data.idPlatform == 1){
        //                     //xbox
        //                     pricesPlayers[req.body.futbinId]['lastXboxPrice'] =dataReturned.data.price; 
        //                 }
        //                 if(dataReturned.data.idPlatform == 2){
        //                     //ps
        //                     pricesPlayers[req.body.futbinId]['lastPsPrice'] =dataReturned.data.price; 
        //                 }
        //                 if(dataReturned.data.idPlatform == 3){
        //                     //origin
        //                     pricesPlayers[req.body.futbinId]['lastOriginPrice'] = dataReturned.data.price; 
        //                 }
        //                 if(needUpdate.length == cbs){
        //                     logger.log('res.send 2');
        //                     return res.status(200).send({data:'DEU CERTO MANO'});
        //                 }
        //             })
        //         }
        //     }
        // }

// 