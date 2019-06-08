/**
 * @author Ramon Victor <ramonvictorn@gmail.com>
 */

//require packages
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const routes = require('./core/routes.js');
const db = require('./db.js');
const app = express();
const settings = require('./settings').settings;
// static files
app.use('/js', express.static(__dirname + '/web/public/js'));
app.use('/css', express.static(__dirname + '/web/public/css'));
app.use('/assets', express.static(__dirname + '/web/public/assets'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    store: new FileStore('../session'),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false ,
        maxAge  : 60000, //1 minuto
    },
}))

app.use(function (req, res, next) { 
    console.log('Request:', req.method, req.originalUrl);
    console.log('Body:', req.body, req.originalUrl);
    next();
});
//  Pageview setting
app.get('*', (req,res) =>{res.sendFile(path.resolve('./src/web/public/view/index.html'))});
routes.init(app)

db.initDb(
    () => {
        app.listen(process.env.PORT,(req,res)=>{
            console.log(`Running on port ${process.env.PORT}`)
        }
    )

     }
)