const db = require('../../db.js');
const logger = require('../../libs/logger.js');

function getPrices(context,cb){
    let queryValues = [
        context.idPlayer,
        context.idPlatform,
        context.year,
        context.month,
    ]

    let queryString = `SELECT 
            id_player as "idPlayer",
            id_price as "idPrice",
            id_platform as "idPlatform",
            price,
            day,
            month,
            year,
            hour,
            minutes
        FROM 
            prices
        WHERE
            id_player = $1 AND id_platform = $2 and "year" = $3 and month = $4
        ORDER by day asc;`;
    
        db.query(queryString,queryValues,(err, result)=>{
            if(err){
                logger.log('ERROR ON GET_PRICES', err);
                cb({error:'QUERY_ERROR'});
            }else{
                cb({data:result.rows});
            }

        })
}
module.exports =  getPrices;
