exports.init = init
function init(app){
    app.get('/ping', (req,res)=>{
        res.send('Ping' + Date.now())
    })



}