const db = require('../../db.js');
const timeGMT = require('../../libs/timeGMT.js');
module.exports = priceAnalysis;
function priceAnalysis(context,cb){
    let userDb;
    let queryInsert = ``;
    let dateGMT = new timeGMT();
    let queryValues = [
        context.idPlatform,
        context.idPlayer,
        dateGMT.getDay(),
        dateGMT.getMonth(),
        dateGMT.getYear(),
        
    ];
    let queryString = `SELECT
            * 
        FROM 
            analyzed 
        WHERE
            id_platform = $1 AND id_player = $2 AND "day" = $3 AND "month" = $4 AND "year" = $5;`;

    db.query(queryString, queryValues, (err,res)=>{   
        if(err){
            cb({error:'ERROR_ON_PRICE_ANALYSIS'})
        }else{
            cb({data:res.rows[0]})
        }
        
    })
}




function addNewAnalysis(params){
    console.log('addNewAnalysis')
    getLowPrice({},(ret)=>{
        
    })
} 

function UpdateAnalysis(params){
    console.log('UpdateAnalysis')
} 

//passos
// 1º - Ver se já tem alguma linha na tabela desse dia 
// 2º - se nao tiver eu insiro uma nova
// 3º - se sim eu dou um update

//como inserir
// ir no prices e pegar o MENOR e o MAIOR preço, pegar o preço ATUAL e fazer as porcentagen
//PRONTO