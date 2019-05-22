const db = require('../../db.js')
module.exports = getAllPlayers;
function getAllPlayers(cb){
    let queryString = `select
        id_player as "idPlayer",
        id_futbin as "idFutbin",
        name,
        category,
        details
        FROM players;`

    db.query(queryString,(err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_GET_ALL_PLAYERS'})
        }else{
            cb({data:res.rows})
        }
        
    })
}


function teste (){
    db.initDb(()=>{
        let context = {

        }
        console.log('teste getPlayers')
        let queryString = `select
            id_player as "idPlayer",
            id_futbin as "idFutbin",
            name,
            category,
            details
            FROM players;`

        db.query(queryString,(err,res)=>{
            console.log('cb do prices', res.rows)
        })
    })
    
}
// teste()