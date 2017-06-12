var DatabaseManager = module.exports = {};

var fs = require('fs');
const mongoose = require('mongoose');


var exampleData;
var filters = {
    languages: ["js", "html", "css", "java", "c", "c#", "c++", "php", "python"],
    lang: ["fr", "en"],
    technology: ["AngularJS", "React", "Angular 2", "Angular 4", "jQuery", "NodeJS"],
    type: ["Video", "Blog", "Github"]
};

DatabaseManager.init = function (address, port) {
    log("Database Manager loaded");

    fs.readFile('exampleData.json', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        exampleData = { data: JSON.parse(data) }
        log("Example Database loaded");
    });

    // ~~~~~~~~~~~~~ MONGOOSE ~~~~~~~~~~~~~~~~~~~~~~~


    let uri = 'mongodb://localhost:27017/tuto';

    mongoose.connect(uri, (error) => {
        if (error) throw error;
    })


    const schemaTuto = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        note: Number,
        language: {
            type: String,
            required: true
        },
        technologie: {
            type: String,
            required: true
        },
        dateCreate: {
            type: Date,
            required: true
        },
        media: {
            type: String,
            required: true
        },
        comments: {
            type: Array,
            required: false
        },
        // timestamps: true
    });

    Tuto = mongoose.model('Tuto', schemaTuto)
}


DatabaseManager.getExampleData = function () {
    return exampleData;
}

DatabaseManager.getTutorialById = function () {
    return exampleData;
}

DatabaseManager.getFiltersFor = function (type) {
    // TODO
    return filters[type] || null;
}

//API routed
DatabaseManager.getAllTutos = function () {
    Tutos.get(function (req, res) {
        Tutos.find(function (err, tuto) {
            if (err) {
                return err;
            }
            return tuto;
        });
    })
}
DatabaseManager.postNewTuto = function (body) {
    let tuto = {
        title: body.title,
        description: body.description,
        language: body.language,
        technologie: body.technologie,
        dateCreate: body.dateCreate,
        media: body.media,
        comments: body.comments
    }

    Tuto.create(tuto)
    console.log('okkkk', tuto)
}

function log(text, ...args) {
    console.log("[DBM] ".blue + text.blue, ...args);
}

    //     .post(function (req, res) {
    //         var Tuto = new Tutos();
    //         tuto.title = req.body.title
    //         tuto.description = req.body.description
    //         tuto.language = req.body.language
    //         tuto.technologie = req.body.technologie
    //         tuto.dateCreate = req.body.dateCreate
    //         tuto.media = req.body.media
    //         tuto.comments = req.body.comments


    //         Tuto.save(function (err) {
    //             if (err) {
    //                 res.send(err);
    //             }
    //             res.send({ message: 'Tuto created' });
    //         })
    //     });

    // routed
    //     .route('/:tuto_id')
    //     .get(function (req, res) {
    //         Tuto.findOne({ _id: req.params.tuto_id }, function (err, todo) {
    //             if (err) {
    //                 res.send(err);
    //             }
    //             res.json({ tuto });
    //         });
    //     })
    //     .put(function (req, res) {
    //         Tuto.findOne({ _id: req.params.tuto_id }, function (err, tuto) {
    //             if (err) {
    //                 res.send(err);
    //             }

    //             tuto.title = req.body.title
    //             tuto.description = req.body.description
    //             tuto.language = req.body.language
    //             tuto.technologie = req.body.technologie
    //             tuto.dateCreate = req.body.dateCreate
    //             tuto.media = req.body.media
    //             tuto.comments = req.body.comments

    //             todo.save(function (err) {
    //                 if (err) {
    //                     res.send(err);
    //                 }
    //                 res.send({ message: 'Tuto update' });
    //             });
    //         });
    //     })
    //     .delete(function (req, res) {
    //         Tuto.remove({ _id: req.params.tuto_id }, function (err) {
    //             if (err) {
    //                 res.send(err);
    //             }
    //             res.send({ message: 'tuto deleted' });
    //         });
    //     });
    // app.use("/Todo", routed);

