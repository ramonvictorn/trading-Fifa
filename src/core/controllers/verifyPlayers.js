//controllers
const addPlayerController = require('../controllers/addPlayer.js');
const getPlayerController = require('../controllers/getPlayer.js');
const addPricePlayerController = require('../controllers/addPricePlayer.js')
const getPlatformController = require('../controllers/getPlatform.js')

const priceAnalysisControler = require('../controllers/priceAnalysis.js');
//models
const getLastPlatformPriceModels = require('../models/getLastPlatformPrice.js');

let players = {};
let pricePlayers={};
let contator = 0;
module.exports = verifyPlayers;
function verifyPlayers(req,res){
    console.log('---------------------------contator ', req.body.playerName, 'idFutbin ', parseInt(req.body.futbinId), contator++)
    if(!checkParams(req.body)){
        console.log('Verify_player - INVALID PARAMS, returning code 400');
        res.status(400).send({error:"INVALID_PARAMS"});
        return;
    }
    
    let needUpdate = [];
    let dataPlayer = {};
    let context = {
        name: req.body.playerName,
        idFutbin : parseInt(req.body.futbinId),
        originPrice : parseInt(req.body.lastOriginPrice),
        xboxPrice : parseInt(req.body.lastXboxPrice),
        ps4Price: parseInt(req.body.lastPsPrice),
        toUpdate :{
            ['xbox'] : parseInt(req.body.lastXboxPrice),
            ['ps4'] : parseInt(req.body.lastPsPrice),
            ['origin'] : parseInt(req.body.lastOriginPrice),
        }
    };
    let contextBody = {
        name: req.body.playerName,
        idFutbin : parseInt(req.body.futbinId),
        ['xbox'] : parseInt(req.body.lastXboxPrice),
        ['ps4'] : parseInt(req.body.lastPsPrice),
        ['origin'] : parseInt(req.body.lastOriginPrice),
    };
    if(players[context.idFutbin] == true && pricePlayers[context.idFutbin] != undefined){
        // test xbox
        if(pricePlayers[context.idFutbin]['xbox'] != context.xboxPrice ){
            // xbox is different
            needUpdate.push({ platform: 'xbox', price:context.xboxPrice})
        }
        // test ps4
        if(pricePlayers[context.idFutbin]['ps4'] != context.ps4Price){
            // ps4 is different
            needUpdate.push({ platform:'ps4', price:context.ps4Price})
        }
        // test origin
        if(pricePlayers[context.idFutbin]['origin'] != context.originPrice){
            // origin is different
            needUpdate.push({platform:'origin', price: context.originPrice})
        }

        if(needUpdate.length > 0){
            savesOnDataBase(needUpdate,context,(ret)=>{
                console.log('saved - 1')
            })
        }else{
            console.log('Valores iguais')
            done(200,'Valores Iguais - code 3')
        }
    }else{
        getPlayerController(context,(ret)=>{
            if(ret.data && ret.data.length >= 1){
                players[context.idFutbin] = true;
                pricePlayers[context.idFutbin] = {}; 
                needUpdate.push({ platform: 'xbox', price:context.xboxPrice})
                needUpdate.push({ platform:'ps4', price:context.ps4Price})
                needUpdate.push({platform:'origin', price: context.origin})
                savesOnDataBase(needUpdate,context,(ret)=>{
                    console.log('saved 2 - player já cadastrado')
                })
            }else{
                addPlayerController(context,(ret)=>{
                    // player adicionado
                    if(!ret.error){
                        console.log('Player_Adicionado ', ret.data.name)
                        players[context.idFutbin] = true;
                        pricePlayers[context.idFutbin] = {};
                        needUpdate.push({ platform: 'xbox', price:context.xboxPrice})
                        needUpdate.push({ platform:'ps4', price:context.ps4Price})
                        needUpdate.push({platform:'origin', price: context.origin})
                        savesOnDataBase(needUpdate,context,(ret)=>{
                            console.log('saved 3 - player adicionado e dados salvos')
                        })
                    }else{
                        console.log('VERIFY - ERROR_ON_ADD_PLAYER_', JSON.stringify(ret.error));
                    }
                })
            }
        })
    }
    
    /**
     * @function savesOnDataBase
     * @param {Array} platforms - Array with name of platforms 
     * @param {Object} context  - The object with properties to save
     * @param {Function} cb - The callback function  
     */
    function savesOnDataBase(platforms,context,cb){
        let dones = 0;
        getPlayerController({idFutbin:contextBody.idFutbin},(ret)=>{
            contextBody.idPlayer = ret.data[0].idPlayer;
            for(let a = 0; a < platforms.length; a++){
                getPlatformController({name:platforms[a].platform},(ret)=>{
                    if(!ret.error){
                        let newObject = {
                            idPlatform : ret.data[0].idPlatform,
                            price:contextBody[ret.data[0].name],
                        }

                        getLastPlatformPriceModels({...contextBody, idPlatform: newObject.idPlatform, price:newObject.price, namePlatform: ret.data[0].name},(retu)=>{
                            if(!retu.error){
                                if(retu.data && retu.data.price){
                                    if(retu.data.price != contextBody[retu.data.name]){
                                        let newAddPriceDifferent = {
                                            ...contextBody,
                                            price: contextBody[retu.data.name],
                                            idPlatform: retu.data.idPlatform,
                                        }
                                            addPricePlayerController(newAddPriceDifferent, (ret)=>{
                                                    console.log('adding1');
                                                    priceAnalysisControler(newAddPriceDifferent,(ret)=>{

                                                    })
                                                    dones+=1;
                                                    if(dones == platforms.length){
                                                        done(200,'alterados -code -4')
                                                    }
                                            })
                                        }else{
                                            //price equals
                                            dones+=1;
                                            if(dones == platforms.length){
                                                done(200,'done - code -5')
                                            }
                                        }
                                }else{
                                    let newAddPrice = {
                                        ...contextBody,
                                        price: retu.paramSend.price,
                                        idPlatform: retu.paramSend.idPlatform,
                                    }
                                    addPricePlayerController(newAddPrice, (ret)=>{
                                        console.log('adding2');
                                        priceAnalysisControler(newAddPrice,(ret)=>{
                                                        
                                        })
                                        dones+=1;
                                        if(dones == platforms.length){
                                            done(200,'alterados -code -6')
                                        }
                                    })
                                }
            
                            }else{
                                done(400,"ERRO_ON_GET_LAS_PRICE_PLATFORM")
                            }
                        })
                    }else{
                        done(400,"ERRO_ON_GET_PLATFORM")
                    }
                })
            }   
            pricePlayers[context.idFutbin]['xbox'] = context.xboxPrice;
            pricePlayers[context.idFutbin]['origin'] = context.originPrice;
            pricePlayers[context.idFutbin]['ps4'] = context.ps4Price;
        })
    }

    function done(code,text){
        if(code == 400){
            console.log('ERROR   -> ', text)
            res.status(code).send({error:text})
        }else{
            res.status(code).send({data:text})
        }
    }   
}

/**
 * 
 * @param {params} params - The body of requisition
 * @returns false if requisition is not ok 
 */
function checkParams(params){
    if(isNaN(params.futbinId)|| params.futbinId == 0) return false;
    if( isNaN(params.lastXboxPrice)) return false;
    if( isNaN(params.lastOriginPrice)) return false;
    if( isNaN(params.lastPsPrice)) return false;
    return true; //if all ok
}
