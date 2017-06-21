var mongoose = require('mongoose');

var User = module.exports = {};

// BRICE GITHUB ID : 18247624 && LOGIN : BumbleBrice

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
      },
      username: {
         type: String,
         required: true
      },
      displayName: {
         type: String,
         required: false
      },
      emails: [
         {
            value: String,
            _id: false // To prevent mongoose from creating unwanted _id property
         }
      ],
      avatarUrl: {
         type: String,
         require: false
      },
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

User.onConnection = function (profile, accessToken, refreshToken, done) {
   this.model.findOne({githubId: profile.id}, (err, userFound) => {
      if (userFound) {
         // Update user and save it 

         userFound.displayName = profile.displayName;
         userFound.username = profile.username;
         userFound.accessToken = accessToken;
         userFound.refreshToken = refreshToken;
         userFound.emails = profile.emails;
         userFound.avatarUrl = profile._json.avatar_url

         userFound.save((err) => {
            console.log(err);
         });

         done(null, userFound); // CALLBACK FOR AUTHENTICATION

      } else {
         // Create user
         let userTemp = {
            githubId: profile.id,
            accessToken,
            username: profile.username,
            displayName: profile.displayName,
            emails: profile.emails,
            avatarUrl: profile._json.avatar_url
         }
         this.model.create(userTemp, (err, userResponse) => {
            if (err) console.log(err);
            done(null, userResponse); // CALLBACK FOR AUTHENTICATION
         })
      }
   })
}

User.delete = function (_id) {
   this.model.remove({_id: _id}, function(err) {
      if (err) return console.log(err);
   })
}