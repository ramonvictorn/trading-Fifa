const priceAnalysisModel = require('../models/priceAnalysis.js');
const GMTdate = require('../../libs/timeGMT.js');
const db = require('../../db.js');
module.exports = priceAnalysis;
function priceAnalysis(params,cb){
    let lowPrice;
    let hightPrice;

        priceAnalysisModel(params,(dataReturned)=>{
            if(dataReturned.data == undefined){
                // precisa inserir
                getLowPrice(params,(dataRet)=>{
                    console.log('low price é : ', dataRet.data.idPlatform ,'preço->',dataRet.data.price);
                    lowPrice = dataRet.data.price;
                    if(hightPrice != undefined){
                        calculatePercentage({lowPrice,hightPrice,...params},
                            (dataReturned)=>{
                                console.log('percentagem is ', dataReturned);
                        })
                    }
                });
                getHightPrice(params,(dataRet)=>{
                    console.log('HightPrice é ', dataRet.data.price);
                    hightPrice = dataRet.data.price;
                    if(lowPrice != undefined){
                        calculatePercentage({lowPrice,hightPrice,...params},
                            (dataReturned)=>{
                                console.log('percentagem is ', dataReturned);
                        })
                    }
                })

            }else{
                // update
                getLowPrice(params,(dataRet)=>{
                    console.log('low price é : ', dataRet.data.idPlatform ,'preço->',dataRet.data.price);
                    lowPrice = dataRet.data.price;
                    if(hightPrice != undefined){
                        updatePercentage({lowPrice,hightPrice,...params},
                            (dataReturned)=>{
                                console.log('percentagem is ', dataReturned);
                        })
                    }
                });
                getHightPrice(params,(dataRet)=>{
                    console.log('HightPrice é ', dataRet.data.price);
                    hightPrice = dataRet.data.price;
                    if(lowPrice != undefined){
                        updatePercentage({lowPrice,hightPrice,...params},
                            (dataReturned)=>{
                                console.log('percentagem is ', dataReturned);
                        })
                    }
                })
            }
        })
}


function updatePercentage(params,cb){
    console.log('updatePercentage');
    let dateGmt = new GMTdate();
    let context = {
        price: params.price,
        lowPrice : params.lowPrice,
        hightPrice:params.hightPrice,
        lastPrice:params.lastPrice,
        idPlayer: params.idPlayer,
        idPlatform: params.idPlatform,
        day : dateGmt.getDay(),
        month : dateGmt.getMonth(),
        year : dateGmt.getYear(),
    }
    
    query();
    function query(){
        let queryString = `UPDATE  analyzed 
         SET
            variation_low_price = $1,
            variation_high_price = $2,
            lower_price_last_day = $3,
            higher_price_last_day = $4,
            last_price = $5
        WHERE 
            id_player = $6 and id_platform = $7 and "day" = $8 and "month" = $9 and "year" = $10;`;

        let queryValues = [
            getPercentagem(context.price,context.lowPrice),
            getPercentagem(context.price,context.hightPrice),
            context.lowPrice,
            context.hightPrice,
            context.price,
            context.idPlayer,
            context.idPlatform,
            context.day,
            context.month,
            context.year,
        ];
        db.query(queryString, queryValues, (err,res)=>{   
            if(err){
                console.log('ERROR_ON_GE_UPDADE_ANALIZED_PRICE')
            }else{
                return cb({data:res.rows[0]});
            }
        })
    }
}

function calculatePercentage(params,cb){
    console.log('insert percentagem')
    let dateGmt = new GMTdate();
    let context = {
        price: params.price,
        lowPrice : params.lowPrice,
        hightPrice:params.hightPrice,
        lastPrice:params.lastPrice,
        idPlayer: params.idPlayer,
        idPlatform: params.idPlatform,
        day : dateGmt.getDay(),
        month : dateGmt.getMonth(),
        year : dateGmt.getYear(),
    }
    
    query();
    function query(){
        let queryString = `
            INSERT INTO 
                analyzed 
            (id_player, 
            id_platform,
            last_price,
            lower_price_last_day,
            higher_price_last_day,
            variation_low_price,
            variation_high_price,
            day,
            month,
            year,
            date_inserted) 
        VALUES ($1,$2,$3,$4, $5, $6, $7, $8,$9,$10, now());`
        let queryValues = [
            context.idPlayer,
            context.idPlatform,
            context.price,
            context.lowPrice,
            context.hightPrice,
            getPercentagem(context.price,context.lowPrice),
            getPercentagem(context.price,context.hightPrice),
            context.day,
            context.month,
            context.year,
        ];
        db.query(queryString, queryValues, (err,res)=>{   
            if(err){
                console.log('ERROR_ON_GE_INSERT_ANALIZED_PRICE')
            }else{
                return cb({data:res.rows[0]});
            }
        })
    }
}
function getPercentagem(price,priceReference){
    // return parseInt((((price / priceReference) - 1) * 100).toFixed(1))
    return parseFloat((((price / priceReference) - 1) * 100).toFixed(2))
}

/**
 * @function getLowPrice Return the last price
 * @param {Object} params
 * @param {number} params.idPlatform - The id platform 
 * @param {number} params.idPlayer - The id player
 * @returns The last price
 * 
 */
function getLowPrice(params,cb){ 
    let dateGMT = new GMTdate();
    let queryValues = [
        params.idPlatform,
        params.idPlayer,
        dateGMT.getDay(),
        dateGMT.getMonth(),
        dateGMT.getYear(),  
    ];
    let queryString = `SELECT 
            id_player as "idPlayer",
            price,
            id_platform as "idPlatform" 
        FROM 
            prices 
        WHERE
            id_platform = $1 AND id_player = $2 AND "day" = $3 AND "month" = $4 AND "year" = $5
        ORDER BY price ASC LIMIT 1;`;

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            console.log('ERROR_ON_GE_LOW_PRICE')
        }else{
            return cb({data:res.rows[0]});
        }
    })

}

/**
 * @function getLowPrice Return the Low price
 * @param {Object} params
 * @param {number} params.idPlatform - The id platform 
 * @param {number} params.idPlayer - The id player
 * @returns The last price
 * 
 */
function getHightPrice(params,cb){ 
    let dateGMT = new GMTdate();
    let queryValues = [
        params.idPlatform,
        params.idPlayer,
        dateGMT.getDay(),
        dateGMT.getMonth(),
        dateGMT.getYear(),  
    ];
    let queryString = `SELECT 
            id_player as "idPlayer",
            price,
            id_platform as "idPlatform" 
        FROM 
            prices 
        WHERE
            id_platform = $1 AND id_player = $2 AND "day" = $3 AND "month" = $4 AND "year" = $5
        ORDER BY price DESC LIMIT 1;`;

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            console.log('ERROR_ON_GET_HIGHT_PRICE')
        }else{
            return cb({data:res.rows[0]});
        }
    })

}
