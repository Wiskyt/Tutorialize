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

   // Connexion à l'api
   let uri = 'mongodb://localhost:27017/tuto';

   mongoose.connect(uri, (error) => {
      if (error) throw error;
   })

   // Déclaration du schema Tuto
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
         type: String,
         required: true
      },
      media: {
         type: String,
         required: true
      },
      /*  comments: {
            type: Array,
            required: false
        },*/
      // timestamps: true
   })

   // Déclaration du model à Mongoose
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

function log(text, ...args) {
   console.log("[DBM] ".blue + text.blue, ...args);
}