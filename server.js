require('colors');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var dbm = require('./database-manager');
dbm.init();

// On autorise plus de requêtes pour éviter les soucis
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.json());

app.use(express.static('public')); // On distribue le dossier public

// ~~~~~~~~~~~~~ ROUTING ~~~~~~~~~~~~~~~

app.get('/data', function(req, res) {
    console.log('GET Request at Data');
    res.send(dbm.getExampleData());
});

app.get('/filters/:type', function(req, res) {
    console.log('GET Request at Filters, Type : ' + req.params.type);
    dbm.getFiltersFor(req.params.type);

});

// ~~~~~~~~~~~~ ROUTING END ~~~~~~~~~~~~~~~~~~~~

var server = app.listen(9000, '127.0.0.1', function() {
    let serverInfo = server.address();
    console.log(('\n\tServer started on http://' + serverInfo.address + ':' + serverInfo.port));
    console.log('Ready to Roll !'.america);
    // On utilise .couleur aprés un string pour un max de style quand on débug
});