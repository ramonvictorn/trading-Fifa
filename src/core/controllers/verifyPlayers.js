//controllers
const addPlayerController = require('../controllers/addPlayer.js');
const getPlayerController = require('../controllers/getPlayer.js');
const addPricePlayerController = require('../controllers/addPricePlayer.js')
const getPlatformController = require('../controllers/getPlatform.js')
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
            done('Valores Iguais - code 3')
        }
    }else{
        getPlayerController(context,(ret)=>{
            if(ret.data.length >= 1){
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
        getPlayerController(context,(ret)=>{
            context.idPlayer = ret.data[0].idPlayer;

            for(let a = 0; a < platforms.length; a++){
                getPlatformController({name:platforms[a].platform},(ret)=>{
                    if(!ret.error){
                        let newObject = {
                            idPlatform : ret.data[0].idPlatform,
                            price: ret.data[0].name == 'xbox' ? context.xboxPrice : (ret.data[0].name == 'ps4' ? context.ps4Price : context.originPrice ),
                        }
                        context.price = ret.data[0].name == 'xbox' ? context.xboxPrice : (ret.data[0].name == 'ps4' ? context.ps4Price : context.originPrice );
                        getLastPlatformPriceModels({...context, idPlatform:ret.data[0].idPlatform, price:newObject.price},(retu)=>{
                            if(retu.data){
                                if(retu.data.price != context.toUpdate[retu.data.name]){
                                    addPricePlayerController({...context, idPlatform: ret.data[0].idPlatform,price:context.toUpdate[ret.data[0].name]}, (ret)=>{
                                        dones+=1;
                                        if(dones == platforms.length){
                                            // cb()
                                            done('alterados -code -4')
                                        }
                                    })
                                }else{
                                    dones+=1;
                                    // cb()
                                    if(dones == platforms.length){
                                        done('NOT_MODIFIQUED - 1')
                                    }
                                }
                            }else{
                                console.log('NAO TEVE DATA NO LAST')
                                addPricePlayerController({...context,idPlatform:retu.idPlatform,price:retu.price}, (ret)=>{
                                    dones+=1;
                                    if(dones == platforms.length){
                                        // cb()
                                        done('dados alterados- code 2')
                                    }
                                })
                            }
                        })
                    }
                })
            }   
            pricePlayers[context.idFutbin]['xbox'] = context.xboxPrice;
            pricePlayers[context.idFutbin]['origin'] = context.originPrice;
            pricePlayers[context.idFutbin]['ps4'] = context.ps4Price;
        })
    }

    function done(action){
        res.status(200).send({data:action})
        console.log("done aqui", action)
    }   
}

/**
 * 
 * @param {params} params - The body of requisition
 * @returns false if requisition is not ok 
 */
function checkParams(params){
    // if(params.futbinId == undefined) return false;
    // if(params.lastXboxPrice  == undefined) return false;
    // if(params.lastOriginPrice  == undefined) return false;
    // if(params.lastPSPrice  == undefined) return false;
    // version old
    if(isNaN(params.futbinId)|| params.futbinId == 0) return false;
    if( isNaN(params.lastXboxPrice)) return false;
    if( isNaN(params.lastOriginPrice)) return false;
    if( isNaN(params.lastPsPrice)) return false;
    return true; //if all ok
}
