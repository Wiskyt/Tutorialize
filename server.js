require('colors');
console.log(""); // Init

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var authentication = require('./authentication.js');
authentication.init(app);

var dbm = require('./database-manager');
dbm.init();

// On autorise plus de requêtes pour éviter les soucis
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.json());

app.use(express.static('public')); // On distribue le dossier public

routed = express.Router();

// ~~~~~~~~~~~~~ ROUTING ~~~~~~~~~~~~~~~

app.get('/data', function (req, res) {
    console.log('GET Request at Data');
    res.send(dbm.getExampleData());
});

app.get('/filters/:type', function (req, res) {
    console.log('GET Request at Filters, Type : ' + req.params.type);
    dbm.getFiltersFor(req.params.type);
});

// Get de l'ensemble des tutos et post d'un tuto
routed
    .route('/')
    .get(function (req, res) {
        Tuto.find(function (err, tuto) {
            if (err) {
                res.send(err);
            }
            res.json({ tuto });
        });
    })
    .post(function (req, res) {
        var tuto = new Tuto();
        tuto.title = req.body.title,
            tuto.description = req.body.description,
            tuto.language = req.body.language,
            tuto.dateCreate = req.body.dateCreate,
            tuto.technologie = req.body.technologie,
            tuto.media = req.body.media

        tuto.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'tuto created' });
        })
    });
//
routed
    .route('/:tuto_id')
    .get(function (req, res) {
        Tuto.findOne({ _id: req.params.tuto_id }, function (err, tuto) {
            if (err) {
                res.send(err);
            }
            res.json({ tuto });
        });
    })
    .put(function (req, res) {
        Tuto.findOne({ _id: req.params.tuto_id }, function (err, tuto) {
            if (err) {
                res.send(err);
            }
            tuto.title = req.body.title,
                tuto.description = req.body.description,
                tuto.language = req.body.language,
                tuto.dateCreate = req.body.dateCreate,
                tuto.technologie = req.body.technologie,
                tuto.media = req.body.media
            tuto.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.send({ message: 'tudo update' });
            });
        });
    })
    .delete(function (req, res) {
        Tuto.remove({ _id: req.params.tuto_id }, function (err) {
            if (err) {
                res.send(err);
            }
            res.send({ message: 'tuto deleted' });
        });
    });

app.use("/tuto", routed);
// ~~~~~~~~~~~~ ROUTING END ~~~~~~~~~~~~~~~~~~~~

var server = app.listen(9000, '127.0.0.1', function () {
    let serverInfo = server.address();
    console.log(('\tServer started on http://' + serverInfo.address + ':' + serverInfo.port));
    console.log('\t  Ready to Roll !'.america);
    // On utilise .couleur aprés un string pour un max de style quand on débug
});