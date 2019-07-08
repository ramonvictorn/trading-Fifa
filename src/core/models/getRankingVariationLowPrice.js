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
        p.id_player as "idPlayer",
        p.name,
        p.details,
        analyzed.id_platform as "idPlatform",
        analyzed.last_price as "lastPrice",
        analyzed.lower_price_last_day as "lowerPriceLastDay",
        analyzed.higher_price_last_day as "higherPriceLastDay",
        analyzed.variation_low_price as "variationLowPrice",
        analyzed.variation_high_price as "variationHighPrice",
        analyzed.day,
        analyzed.month,
        analyzed.year,
        analyzed.date_inserted as "dateInserted"
    FROM 
        analyzed 
    INNER JOIN 
        players as p ON p.id_player = analyzed.id_player 
    WHERE 
        analyzed.id_platform = $1 AND analyzed.day = $2 AND analyzed.month = $3 AND analyzed.year = $4
    ORDER by analyzed.variation_low_price asc, analyzed.date_inserted asc limit $5 offset $6 ROWS`;

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