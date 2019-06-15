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
const settings = require('./settings').settings;
const app = express();


// static files
app.use('/js', express.static(__dirname + '/web/public/js'));
app.use('/css', express.static(__dirname + '/web/public/css'));
app.use('/assets', express.static(__dirname + '/web/public/assets'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    store: new FileStore('../session'),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false ,
        maxAge  : 1296000000, //15 dias
    },
}))


app.use(function (req, res, next) { 
    console.log('Request:', req.method, req.originalUrl);
    // console.log('Body:', req.body, req.originalUrl);
    next();
});

//  Pageview setting
routes.init(app);
app.get('*', (req,res) =>{res.sendFile(path.resolve('./src/web/public/view/index.html'))});

db.initDb(
    () => {
        app.listen(process.env.PORT || 8080,(req,res)=>{
            console.log(`Running on port ${process.env.PORT || 8080}`)
            }
        )
     }
)