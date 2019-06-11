const db = require('../../db.js')
const crypto = require('crypto');
module.exports = login;
function login(context,cb){
    let userDb;
    let queryInsert = ``;
    let queryValues = [
        context.login,
    ];
    console.log('login ', context.login)
    const hasher = crypto.createHash('SHA256');
    hasher.update(context.password);
    const enteredHash = hasher.digest('hex');
    let queryString = `SELECT 
    id_user as "idUser",
    name,
    login,
    password,
    details,
    date_inserted as "dateInserted" 
        FROM 
            users 
        WHERE
            login = $1;`

    db.query(queryString, [context.login], (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_ADD_USER'})
        }else{
            console.log('result ramon ', res.rows)
            if(res.rows.length){
                if(res.rows[0].password == enteredHash){
                    cb({data:{...res.rows[0],password:undefined}})
                }else{
                    cb({error:'PASSWORD_INVALID'})
                }  
            }else{
                cb({error:'USER_NOT_FOUND'})
            }
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