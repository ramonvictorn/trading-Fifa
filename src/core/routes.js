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
const isLoggedController = require('./controllers/isLogged.js');
const getRankingVariationLowPriceControler = require('./controllers/getRankingVariationLowPrice.js');
const logoutController = require('./controllers/logout.js');
const getPricesController = require('./controllers/getPrices.js');
const getWalletController = require('./controllers/getWallet.js');
const addNewDataOnWalletController = require('./controllers/addNewDataOnWallet.js');
const deleteDataOnWalletController = require('./controllers/deleteDataWallet.js');
const getLastPlatformPriceController = require('./controllers/getLastPlatformPrice.js');
//middlewares
const checkParamsMid = require('./middlewares/checkParams.js');
const verifyPlayer = require('./middlewares/verifyPlayer.js');
const verifyPriceMid = require('./middlewares/verifyPrice.js');
const verifySession = require('./middlewares/verifySession.js');
let contador = 1

function init(app){
    app.get('/ping', (req,res)=>{
        console.log('ping acessado' , contador)
        contador++
        res.send('Ping' + Date.now())
    })
    app.post('/players/getAllPlayers',verifySession, getAllPlayersController);
    // app.post('/players/getPlayer',verifyPlayers,  getPlayerController);
    // app.post('/players/addPlayer', addPlayerController);
    // app.post('/players/addPricePlayer', verifyPlayers);
    app.post('/users/addUser', addUserController);
    app.post('/login', loginController );
    app.post('/users/isLogged', isLoggedController);
    app.post('/logout' ,logoutController );
    
    app.post('/testeSet', (req,res)=>{
        setTimeout(() => {
            res.status(200).send({'data':'setFoi'})
        }, 5000);
    })

    app.post('/players/addPricePlayer', checkParamsMid, verifyPlayer, verifyPriceMid);
    app.post('/getRankingVariationLowPrice', verifySession, getRankingVariationLowPriceControler);
    app.post('/player/getPrices',verifySession, getPricesController);
    app.post('/user/getWallet', verifySession, getWalletController);
    app.post('/user/addDataOnWallet', verifySession , addNewDataOnWalletController);
    app.post('/user/deleteDataOnWallet', verifySession , deleteDataOnWalletController);
    app.post('/player/getLastPrice', verifySession, getLastPlatformPriceController)
}