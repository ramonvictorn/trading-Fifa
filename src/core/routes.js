exports.init = init

let contador = 1
function init(app){
    app.get('/ping', (req,res)=>{
        console.log('ping acessado' , contador)
        contador++
        res.send('Ping' + Date.now())
    })



}