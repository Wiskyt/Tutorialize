var DatabaseManager = module.exports = {};

var fs = require('fs');
const mongoose = require('mongoose');

var exampleData;

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
}


DatabaseManager.getExampleData = function () {
   let temp = exampleData.data;
   temp.map((e) => { // Create temporary ratings
      e.rating = Math.floor(Math.random() * 5) + 1; 
      return e;
   })
   return exampleData;
}

function log(text, ...args) {
   console.log("[DBM] ".blue + text.blue, ...args);
}