const db = require('../../db.js')
module.exports = deleteDataWallet;
function deleteDataWallet(context,cb){
    let queryWhere = ``;
    let queryValues = [
        context.idUser,
        context.idBuy,
    ];
   
    let queryString = `DELETE FROM 
            wallets 
        WHERE 
            id_user = $1 AND id_buy = $2
        RETURNING
            id_buy as "idBuy",
            id_user as "idUser",
            id_player as "idPlayer",
            id_platform as "idPlatform",
            price,
            date_inserted as "dateInserted" ;`;

    db.query(queryString,queryValues,(err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_DELETE_DATA_WALLET'})
        }else{
            if(res.rows.length == 1){
                cb({data:res.rows[0]})
            }else{
                cb({data:res.rows})
            }
        }
    })
}
