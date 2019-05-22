const db = require('../../db.js')


module.exports = getPlayer;
function getPlayer(context,cb){
    let queryWhere = ``;
    let queryValues = [];

    if(context.idFutbin){
        queryWhere += queryValues.length >= 1 ? 'AND': ' WHERE '
        queryValues.push(context.idFutbin);
        queryWhere += ` id_futbin = $${queryValues.length}`
    }
   
    let queryString = `select
        id_player as "idPlayer",
        id_futbin as "idFutbin",
        name,
        category,
        details
        FROM players
        ${queryWhere};`

    db.query(queryString,queryValues,(err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_GET_PLAYER'})
        }else{
            cb({data:res.rows})
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