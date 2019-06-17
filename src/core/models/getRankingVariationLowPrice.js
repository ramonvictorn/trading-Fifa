const db = require('../../db.js');
const GMTdata = require('../../libs/timeGMT.js');
module.exports = getRankingVariationLowPrice;
function getRankingVariationLowPrice(context,cb){
    let dateGMT = new GMTdata();
    let queryValues = [
        context.idPlatform,
        dateGMT.getDay(),
        dateGMT.getMonth(),
        dateGMT.getYear(),  
        context.qtd,
        context.offset || 0,
    ];
    let queryString = `SELECT
        id_player as "idPlayer",
        id_platform as "idPlatform",
        last_price as "lastPrice",
        lower_price_last_day as "lowerPriceLastDay",
        higher_price_last_day as "higherPriceLastDay",
        variation_low_price as "variationLowPrice",
        variation_high_price as "variationHighPrice",
        day,
        month,
        year,
        date_inserted as "dateInserted"
    FROM analyzed
    WHERE 
        id_platform = $1 AND day = $2 AND month = $3 AND year = $4
    ORDER by variation_low_price asc limit $5 offset $6 ROWS`;

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            console.log('ERROR_ON_GET_RANKING_VARIATION_LOW_PRICE')
        }else{
            return cb({data:res.rows});
        }
    })

}


function teste (){
    db.initDb(()=>{
        let context = {
            idPlayer:3

        }
        console.log('teste getPlayers')
        let queryString = `select
            id_player as "idPlayer",
            id_futbin as "idFutbin",
            name,
            category,
            details
            FROM players
            WHERE id_player = ${context.idPlayer};`

        db.query(queryString,(err,res)=>{
            console.log('cb do prices', res.rows)
        })
    })
    
}
// teste()