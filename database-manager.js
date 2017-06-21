var DatabaseManager = module.exports = {};

var webshot = require('webshot');
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
   let test = exampleData.data;

   var temp = test[1];
   // Create webshot
   temp.webshot = temp.description.replace(/\s+/g, '').toLowerCase() + '.png';
/*   console.log("New webshot : ", temp.link + " / " + temp.webshot);
   webshot(temp.link, './public/data/img/webshots/' + temp.webshot, function (err) {
      if (err) console.log(err);
   });*/

   test.map((e) => { // Create temporary ratings
      e.rating = Math.random() * 4.5 + 0.5;
      e.rating = Math.round(e.rating * 2) / 2;
      e.webshot = temp.webshot;
      return e;
   })
   
   return exampleData;
}

function log(text, ...args) {
   console.log("[DBM] ".blue + text.blue, ...args);
}