const db = require('../../db.js')

    module.exports = getLastPlatformPrice;
    function getLastPlatformPrice(context,cb){
        let queryWhere = ``;
        let queryValues = [];
    
        if(context.idPlayer){
            queryWhere += queryValues.length >= 1 ? 'AND': ' WHERE '
            queryValues.push(context.idPlayer);
            queryWhere += ` name = $${queryValues.length}`
        }
        if(context.idPlatform){
            queryWhere += queryValues.length >= 1 ? 'AND': ' WHERE '
            queryValues.push(context.idPlatform);
            queryWhere += ` id_platform = $${queryValues.length}`
        }
       
        let queryString = `SELECT 
                prices.id_player,
                prices.price,
                prices.id_platform as "idPlatform",
                platforms.name
            FROM 
                prices 
            INNER JOIN 
                    platforms 
            ON prices.id_platform = platforms.id_platform and prices.id_player = $1 and prices.id_platform = $2
            ORDER BY prices.date_inserted LIMIT 1;`
    
        db.query(queryString,queryValues,(err,res)=>{   
            if(err){
                cb({error:'ERROR_ON_GET_LAST_PLATFORM_PRICE'})
            }else{
                if(!res.rows.length){
                    cb({
                        idPlatform: context.idPlatform,
                        price: context.price,
                    })
                }else{
                    cb({data:res.rows[0]})
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