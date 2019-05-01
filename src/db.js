
const { Pool, Client } = require('pg')
        
const pool = new Pool({
    user: 'ramon',
    host: 'localhost',
    database: 'fifa-trading',
    password: 'Lantec201',
    port: 5432,
})


// callback - checkout a client
pool.connect((err, client, done) => {
    if(err){
        console.log('db.js: error -' , err)
        pool.end()
        process.exit(-1)
    }else{
        console.log('db.js - connected!')
    }
})
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    // process.exit(-1)
})


// pool.query('select * from prices;', (err, res) => {
    //     console.log('fim da query ',err, JSON.stringify(res.rows,null,2))
    //     // pool.end()
    // })
    
    // pool.query('select * from prices;', (err, res) => {
        //     console.log('fim da 2 query ',err, JSON.stringify(res.rows,null,2))
        //     pool.end()
        // })99
        
        
        // module.exports = client;
        
        function query(query, cb){
            pool.query(query, (err, res) => {
                if(err){
                    if(cb(err,res) == true){
                        console.log('deu true')
                    }else{
                        console.log('n deu true')
                        pool.end()
                        throw(new Error(`db.js: unhandled error`));
                    }
                    
                }else{
                    cb(err,res)
                }
            })
        }
        
        query('select * from pricess;',(err,res)=>{
            console.log('cb da query', )
            return true
        })

        query('select * from prices;',(err,res)=>{
            console.log('cb da query 2', )
            // return true
        })