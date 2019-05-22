/**
 * @author Ramon Victor <ramonvictorn@gmail.com>
 */

//require packages
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')

const routes = require('./core/routes.js');
const db = require('./db.js');
const app = express();

// static files
app.use('/js', express.static(__dirname + '/web/public/js'));
app.use('/css', express.static(__dirname + '/web/public/css'));
app.use('/assets', express.static(__dirname + '/web/public/assets'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

routes.init(app)
//  Pageview setting
app.get('*', (req,res) =>{res.sendFile(path.resolve('./src/web/public/view/index.html'))});

app.use(function (req, res, next) {
    console.log('Request:', req.method, req.originalUrl);
    console.log('Body:', req.body, req.originalUrl);
    next();
});
db.initDb(
     () => {
        app.listen(8080,(req,res)=>{
            console.log('Running on port 8080')
        }
    )

     }
)