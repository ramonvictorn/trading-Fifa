const db = require('../../db.js')
module.exports = addPlayer;
function addPlayer(context,cb){
    let queryInsert = ``;
    let queryValues = [
        context.futbinId,
        context.playerName,
        context.details || {},
        context.category || 'pattern',
    ];
   
    let queryString = `INSERT INTO players 
        (id_futbin,name,details,category,date_inserted) 
    VALUES 
        ($1,$2, $3,$4,now())
    RETURNING 
        id_futbin as "idFutbin",
        id_player as "idPlayer",
        name,
        details,
        category,
        extract(epoch from date_inserted)*1000 as "dateInserted" ;`

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_ADD_PLAYER'})
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