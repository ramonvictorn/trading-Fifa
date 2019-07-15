const db = require('../../db.js')


module.exports = getWallet;
function getWallet(context,cb){
    let queryWhere = ``;
    let queryValues = [
        context.idPlatform,
        context.idUser,
    ];
   
    if(context.qtd){
        queryValues.push(context.qtd);
        queryWhere += ` limit $${queryValues.length} `;
    }

    if(context.offset){
        queryValues.push(context.offset);
        queryWhere += `offset $${queryValues.length} ROWS `;
    }
    let queryString = `SELECT
        p.id_player as "idPlayer",
        p.name,
        p.details,
        wallets.id_platform as "idPlatform",
        wallets.price as "userPrice",
        wallets.id_buy as "idBuy",
        wallets.date_inserted as "dateInserted"
    FROM 
        wallets 
    INNER JOIN 
        players as p ON p.id_player = wallets.id_player 
    WHERE 
        wallets.id_platform = $1 AND wallets.id_user = $2 
    ORDER by wallets.date_inserted asc ${queryWhere};`

    db.query(queryString,queryValues,(err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_GET_WALLET'})
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