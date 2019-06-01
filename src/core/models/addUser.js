const db = require('../../db.js')
const crypto = require('crypto');
module.exports = addUser;
function addUser(context,cb){
    let queryInsert = ``;
    let queryValues = [
        context.name,
        context.login,
        context.details,
    ];

    const hasher = crypto.createHash('SHA256');
    hasher.update(context.password);
    const enteredHash = hasher.digest('hex');
    queryValues.push(enteredHash);

    let queryString = `INSERT INTO users
            (name,login,password,details,date_inserted) 
        VALUES
            ($1,$2,$4,$3, now())
        RETURNING 
        id_user as "idUSer",
        name,
        details,
        date_inserted as "dateInserted";`

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_ADD_USER'})
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