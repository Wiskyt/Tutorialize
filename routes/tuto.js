var mongoose = require('mongoose');
var webshot = require('webshot');

var Tuto = module.exports = {};
Tuto.init = function (app, routed) {

   // Allow export of virtuals variables !
   /*   var options = {
         toObject: {
            virtuals: true
         },
         toJSON: {
            virtuals: true
         }
      };*/

   const schema = new mongoose.Schema({
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      ratings: [{
         grade: Number,
         authorId: mongoose.Schema.Types.ObjectId,
         dateRate: {
            type: Date,
            default: Date.now()
         },
         _id: false
      }],
      lang: {
         type: String,
         required: true
      },
      techno: [{
         type: String,
         required: true,
         _id: false
      }],
      language: [{
         type: String,
         required: true,
         _id: false
      }],
      media: {
         type: String,
         required: true
      },
      author: String,
      price: Number,
      isValid: {
         type: Boolean,
         default: false
      },
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
      webshot: String,
      flags: [{
         date: {
            type: Date,
            default: Date.now(),
            required: true
         }
      }]
      // comments: {}
   }/*, options*/);

   // Déclaration du model à Mongoose
   const Tuto = mongoose.model('Tuto', schema)


   routed
      .route('/')

      /*GET*/
      .get(function (req, res) {
         Tuto.find(function (err, tuto) {
            if (err) {
               res.send(err);
            }

            if (tuto) {
               tuto = tuto.map((t) => { // TODO: Remove in profit of calculating it every put and storing it
                  let n = JSON.parse(JSON.stringify(t));
                  n.averageRating = getAverageRating(t.ratings);
                  if (n.isValid) return n;
               }).filter((t) => {
                  if (t) return t;
               })
            }

            res.json({ tuto });
         });
      })

      /*POST*/
      .post(function (req, res) {
         var tuto = new Tuto();
         tuto.title = req.body.title;
         tuto.description = req.body.description;
         tuto.lang = req.body.lang;
         tuto.techno = req.body.techno;
         tuto.media = req.body.media;
         tuto.author = req.body.author;
         tuto.dateCreate = Date.now();
         tuto.price = req.body.price;
         tuto.link = req.body.link;
         tuto.ratings = req.body.ratings; // TODO: Remove this line in production mode

         tuto.webshot = tuto.description.replace(/\s+/g, '').toLowerCase() + '.png';
         webshot(tuto.link, './public/data/img/webshots/' + tuto.webshot, function (err) {
            if (err) console.log(err);
         });

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

   routed
      .route('/all')
      .get(function (req, res) {
         Tuto.find(function (err, tuto) {
            if (err) {
               res.send(err);
            }

            if (tuto) {
               tuto = tuto.map((t) => { // TODO: Remove in profit of calculating it every put and storing it
                  let n = JSON.parse(JSON.stringify(t));
                  n.averageRating = getAverageRating(t.ratings);
                  return n;
               })

            }

            res.json({ tuto });
         });
      })

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
            tuto.language = req.body.language;
            tuto.techno = req.body.techno;
            tuto.media = req.body.media;
            tuto.author = req.body.author;
            tuto.price = req.body.price;
            tuto.dateCreate = req.body.dateCreate;
            tuto.datePost = req.body.datePost;
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

   routed
      .route('/valid/:tuto_id')
      .post(function (req, res) {
         Tuto.findOne({ _id: req.params.tuto_id }, function (err, tuto) {
            if (err) {
               res.send(err);
            }

            if (tuto) {
               tuto.isValid = true;
               tuto.save(function (err) {
                  if (err) {
                     res.send(err);
                  }
                  res.send({ valid: true })
               })

            } else {
               res.status(404).send("Tutorial not found");
            }
         });
      });

   app.use("/tuto", routed);
}

// Calculates the average rating (Sum with reduce, / length for avg) Rounded and divided to get a 0.5 rounded rating !
function getAverageRating(ratings) {
   return Math.round(ratings.reduce((a, b) => { return { grade: a.grade + b.grade } }).grade / ratings.length * 2) / 2;
}