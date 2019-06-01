exports.init = init

//middlewares
const verifyPlayers = require('./controllers/verifyPlayers.js')

//controllers
const getAllPlayersController = require('./controllers/getAllPlayers.js');
const getPlayerController = require('./controllers/getPlayer.js');
const addPlayerController = require('./controllers/addPlayer.js');
const addPricePlayerController = require('./controllers/addPricePlayer.js')
const addUserController = require('./controllers/addUser.js');
const loginController = require('./controllers/login.js')

let contador = 1
function init(app){
    app.get('/ping', (req,res)=>{
        console.log('ping acessado' , contador)
        contador++
        res.send('Ping' + Date.now())
    })
    // app.post('/players/getAllPlayers', verifyPlayers, getAllPlayersController);
    // app.post('/players/getPlayer',verifyPlayers,  getPlayerController);
    // app.post('/players/addPlayer', addPlayerController);
    app.post('/players/addPricePlayer', verifyPlayers);
    app.post('/users/addUser', addUserController);
    app.post('/users/login', loginController );

}