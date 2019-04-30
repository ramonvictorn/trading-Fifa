/**
 * @author Ramon Victor <ramonvictorn@gmail.com>
 */

//require packages
const express = require('express');
const path = require('path');

const routes = require('./core/routes.js');

const app = express();

// static files
app.use('/js', express.static(__dirname + '/web/public/js'));
app.use('/css', express.static(__dirname + '/web/public/css'));

routes.init(app)
//  Pageview setting
app.get('*', (req,res) =>{res.sendFile(path.resolve('./src/web/public/view/index.html'))});


app.listen(8080,(req,res)=>{
    console.log('Running on port 8080')
})
