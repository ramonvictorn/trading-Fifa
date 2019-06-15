module.exports = addPricePlayer;
const db = require('../../db.js')
function addPricePlayer(context,cb){
    let queryInsert = ``;
    let queryValues = [
        context.idPlayer,
        context.day,
        context.month,
        context.year,
        context.hour,
        context.minutes,
        context.idPlatform,
        context.price,
    ]

    queryInsert = `INSERT INTO prices 
        (id_player,day,month,year,hour,minutes,id_platform,price,date_inserted) 
    VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,now())
    RETURNING
        id_player as "idPlayer",
        price,
        id_platform as "idPlatform";`

    db.query(queryInsert, queryValues,(err,res)=>{   
        if(err){
            console.log('ERROR_ON_ADD_PRICE_PLAYER ', JSON.stringify(err, null,{}))
            cb({error:'ERROR_ON_ADD_PRICE_PLAYER'})
        }else{
            cb({data:res.rows[0]})
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