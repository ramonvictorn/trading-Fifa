const db = require('../../db.js')

function teste (){
    db.initDb(()=>{
        let context = {
            idPlayer:3

        }
        console.log('teste getPlayers')
        let queryString = `select price,id_platform, "minutes" from prices where id_player = 23 and id_platform = 1;`

        db.query(queryString,(err,result)=>{
            console.log('cb do prices', result.rows)
            console.log('soma',result.rows[0].price+10)
        })
    })
    
}
// teste() 