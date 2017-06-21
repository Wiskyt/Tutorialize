var mongoose = require('mongoose');

var Tuto = module.exports = {};
Tuto.init = function (app, routed) {

    const schema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: [{
            grade: Number,
            authorId: String,
            dateRate: Date
        }],
        lang: {
            type: String,
            required: true
        },
        techno: [{
            type: String,
            required: true
        }],
        media: {
            type: String,
            required: true
        },
        author: String,
        price: Number,
        isValid: Boolean,
        link: {
            type: String,
            required: true
        },
        dateCreate: {
            type: Date,
            required: false
        },
        datePost: {
            type: Date,
            default: Date.now(),
            required: true
        },
        flags: [{
            date: {
                type: Date,
                default: Date.now(),
                required: true
            }
        }]
        // comments: {}
    })

    // Déclaration du model à Mongoose
    const Tuto = mongoose.model('Tuto', schema)


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
            tuto.title = req.body.title;
            tuto.description = req.body.description;
            tuto.lang = req.body.lang;
            tuto.techno = req.body.techno;
            tuto.media = req.body.media;
            tuto.author = req.body.author;
            tuto.price = req.body.price;
            tuto.link = req.body.link;
            tuto.isValid = 'false';
            tuto.dateCreate = new Date();
            console.log(tuto)
            tuto.save(function (err) {
                if (err) {
                    res.status(201);
                    res.send({ message: 'Oullalalalalalal l\'erreur' })
                }
                else {
                    res.send({ message: 'tuto created' });
                }
            })
        });
    // Route pour Update les informations
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
                tuto.title = req.body.title;
                tuto.description = req.body.description;
                tuto.lang = req.body.lang;
                tuto.techno = req.body.techno;
                tuto.media = req.body.media;
                tuto.author = req.body.author;
                tuto.price = req.body.price;
                tuto.link = req.body.link;
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
}