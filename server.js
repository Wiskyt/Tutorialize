require('colors');
console.log(""); // Init

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// On autorise plus de requêtes pour éviter les soucis
app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});
app.use(bodyParser.json());

app.use(express.static('public')); // On distribue le dossier public

// LOAD ROUTES
var dbm = require('./database-manager');
dbm.init();

var User = require('./routes/user.js');
User.init(app);

var Authentication = require('./routes/authentication.js');
Authentication.init(app, User);

var Filters = require('./routes/filters.js');
Filters.init(app);

var Tuto = require('./routes/tuto.js');
Tuto.init(app, express.Router());


// ~~~~~~~~~~~~~ ROUTING ~~~~~~~~~~~~~~~


app.get('/data', function (req, res) {
   console.log('GET Request at Data');
   res.send(dbm.getExampleData());
});


// ~~~~~~~~~~~~ ROUTING END ~~~~~~~~~~~~~~~~~~~~

var server = app.listen(9000, '127.0.0.1', function () {
   let serverInfo = server.address();
   console.log(('\tServer started on http://' + serverInfo.address + ':' + serverInfo.port));
   console.log('\t  Ready to Roll !'.america);
   // On utilise .couleur aprés un string pour un max de style quand on débug
});