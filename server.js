require('colors');
console.log(""); // Init

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const dbm = require('./database-manager');
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

app.get('/tuto', function(req, res) {
    console.log('GET Request at Filters, Type : ' + req.params.type);
    dbm.getAllTutos(req.params.type);
    //res.send('teeeeest')
});

app.post('/tuto', function(req, res) {
    console.log('POST new Tuto, Type :');

    dbm.postNewTuto(req.body);
    res.send('Tuto ajouté')
});


// ~~~~~~~~~~~~ ROUTING END ~~~~~~~~~~~~~~~~~~~~

var server = app.listen(9000, '127.0.0.1', function() {
    let serverInfo = server.address();
    console.log(('\tServer started on http://' + serverInfo.address + ':' + serverInfo.port));
    console.log('\t  Ready to Roll !'.america);
    // On utilise .couleur aprés un string pour un max de style quand on débug
});