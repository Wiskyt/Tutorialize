var mongoose = require('mongoose');

var User = module.exports = {};

User.init = function (app) {
   const userSchema = new mongoose.Schema({
      githubId: {
         type: Number,
         unique: true,
         required: true
      },
      accessToken: {
         type: String,
         required: true
      },
      refreshToken: {
         type: String,  
         required: false
      }
   });

   this.model = mongoose.model('User', userSchema)

   app.get('/user', (req, res) => {
      this.model.find({}, function (err, users) {
         if (err) res.send(err);
         res.send(users);
      })
   });

   app.delete('/user/:id', (req, res) => {
     this.delete(req.params.id);
   });
}

User.getOrCreate = function (githubId, accessToken, refreshToken, callback) {
   this.model.find({githubId: githubId}, (err, user) => {
      if (user[0]) { // Index 0 because id is unique anyway
       //  callback(); // TODO DO DO DO DODODO DODO DOD DODODO
         
      } else {
         this.create(githubId, accessToken, refreshToken);
      }
   })
}

User.create = function (githubId, accessToken, refreshToken) {
   let usr = {
      githubId: githubId,
      accessToken: accessToken,
   }
   if (typeof refreshToken !== 'String') {
      usr.refreshToken = refreshToken;
   }

   this.model.create(usr, function(err, user) {
      if (err) console.log(err);
      console.log('New user ', user);
   })
}

User.delete = function (_id) {
   this.model.remove({_id: _id}, function(err) {
      if (err) return console.log(err);
   })
}