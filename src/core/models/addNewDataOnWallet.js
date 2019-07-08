const db = require('../../db.js')
module.exports = addNewDataOnWallet;
function addNewDataOnWallet(context,cb){
    let queryInsert = ``;
    let queryValues = [
        context.idUser,
        context.idPlayer,
        context.idPlatform,
        context.price,
    ];
   
    let queryString = `INSERT INTO
            wallets (id_user,id_player,id_platform,price,date_inserted,details)
        VALUES 
        ($1,$2,$3,$4, now(),'{}') 
        RETURNING 
        id_buy as "idBuy",
        id_user as "idUser",
        id_platform as "idPlatform",
        price,
        details,
        date_inserted as "dateInserted";`;

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_ADD_DATA_ON_WALLET'})
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