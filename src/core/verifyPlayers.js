
const addPlayerController = require('./controllers/addPlayer.js');
const getPlayerController = require('./controllers/getPlayer.js');
const addPricePlayerController = require('./controllers/addPricePlayer.js')
const getPlatformController = require('./controllers/getPlatform.js')

let players = {};
let pricePlayers={};
module.exports = verifyPlayers
let contator = 0
function verifyPlayers(req,res){
    console.log('contator ', contator++)
    if(!checkParams(req.body)){
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
    };
    if(players[context.idFutbin] == true && pricePlayers[context.idFutbin] != undefined){
        // test xbox
        if(pricePlayers[context.idFutbin]['xbox'] != context.xboxPrice ){
            // xbox é diferente
            needUpdate.push({ platform: 'xbox', price:context.xboxPrice})
        }
        // test ps4
        if(pricePlayers[context.idFutbin]['ps4'] != context.ps4Price){
            // ps4 é diferente
            needUpdate.push({ platform:'ps4', price:context.ps4Price})
        }
        // test origin
        if(pricePlayers[context.idFutbin]['origin'] != context.originPrice){
            // origin é diferente
            needUpdate.push({platform:'origin', price: context.originPrice})
        }

        if(needUpdate.length > 0){
            savesOnDataBase(needUpdate,context,(ret)=>{
                console.log('saved - 1')
            })
        }else{
            console.log('Valores iguais')
            done('Valores Iguais')
        }
    }else{
        getPlayerController(context,(ret)=>{
            if(ret.data.length >= 1){
                players[context.idFutbin] = true;
                pricePlayers[context.idFutbin] = {};  /* ver aqui para pegar o ultimo preco do db*/
                // aqui ver o ultimo preço no banco de dados e ser for diferente, adicionar
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
                        players[context.idFutbin] = true;
                        pricePlayers[context.idFutbin] = {};
                        needUpdate.push({ platform: 'xbox', price:context.xboxPrice})
                        needUpdate.push({ platform:'ps4', price:context.ps4Price})
                        needUpdate.push({platform:'origin', price: context.origin})
                        savesOnDataBase(needUpdate,context,(ret)=>{
                            console.log('saved 3 - player adicionado e dados salvos')
                        })
                    }else{
                        console.log('VERIFY - ERRO_ON_ADD_PLAYER_', JSON.stringify(ret.error));
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
                        context.id_platform = ret.data[0].idPlatform;
                        context.price = ret.data[0].name == 'xbox' ? context.xboxPrice : (ret.data[0].name == 'ps4' ? context.ps4Price : context.originPrice );
                        addPricePlayerController(context, (ret)=>{
                            dones+=1;
                            if(dones == platforms.length){
                                console.log('done all saves')
                                cb()
                                done('dados alterados')
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
        return;
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
    if(typeof params.futbinId != 'number') return false;
    if( isNaN(params.lastXboxPrice)) return false;
    if( isNaN(params.lastOriginPrice)) return false;
    if( isNaN(params.lastPsPrice)) return false;
    return true; //if all ok
}
