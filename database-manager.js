var DatabaseManager = module.exports = {};

const mongoose = require('mongoose');

DatabaseManager.init = function (address, port) {
   log("Database Manager loaded");

   // ~~~~~~~~~~~~~ MONGOOSE ~~~~~~~~~~~~~~~~~~~~~~~

   // Connexion à l'api
   let uri = 'mongodb://localhost:27017/tuto';

   mongoose.connect(uri, (error) => {
      if (error) throw error;
      log('Connected to database at ' + uri);
   })
}

function log(text, ...args) {
   console.log("[DBM] ".blue + text.blue, ...args);
}