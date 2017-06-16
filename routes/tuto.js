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
         type: String,
         required: true
      },
      media: {
         type: String,
         required: true
      }
   })

   // Déclaration du model à Mongoose
   this.model = mongoose.model('Tuto', schema)


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
}