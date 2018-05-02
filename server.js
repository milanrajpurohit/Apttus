/****************************
 SERVER MAIN FILE
 ****************************/

// Include Modules
const config = require('./configs/configs');
const mongoose = require('./configs/mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Calling db connection file and get connecting
db = mongoose();

// =======   Routing
require('./app/routes/AgreementRoutes.js')(app, express);

// Listening Server
app.listen(config.serverPort , () => {
	console.log(`Server running at http://localhost:${config.serverPort}`);
});
