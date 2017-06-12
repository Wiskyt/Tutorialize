var Authentication = module.exports = {};

var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var GITHUB_CLIENT_ID = "Iv1.8935fa443f459d71";
var GITHUB_CLIENT_SECRET = "ca94c84f700899e0e7c42b6a25aad607ac67a74c";

Authentication.init = function(app) {
   passport.serializeUser(function (user, done) {
      done(null, user);
   });

   passport.deserializeUser(function (obj, done) {
      done(null, obj);
   });

   passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:9000/auth/github/callback"
   },
      function (accessToken, refreshToken, profile, done) {
         // asynchronous verification, for effect...
         process.nextTick(function () {

            // To keep the example simple, the user's GitHub profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the GitHub account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
         });
      }
   ));

   app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
   // Initialize Passport!  Also use passport.session() middleware, to support
   // persistent login sessions (recommended).
   app.use(passport.initialize());
   app.use(passport.session());


   app.get('/account', ensureAuthenticated, function (req, res) {
      res.send('account');
   });


   // GET /auth/github
   //   Use passport.authenticate() as route middleware to authenticate the
   //   request.  The first step in GitHub authentication will involve redirecting
   //   the user to github.com.  After authorization, GitHub will redirect the user
   //   back to this application at /auth/github/callback
   app.get('/auth/github',
      passport.authenticate('github', { scope: ['user:email'] }),
      function (req, res) {
         console.log("lol");
         // The request will be redirected to GitHub for authentication, so this
         // function will not be called.
      });

   // GET /auth/github/callback
   //   Use passport.authenticate() as route middleware to authenticate the
   //   request.  If authentication fails, the user will be redirected back to the
   //   login page.  Otherwise, the primary route function will be called,
   //   which, in this example, will redirect the user to the home page.
   app.get('/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/login' }),
      function (req, res) {
         res.redirect('/');
      });

   app.get('/logout', function (req, res) {
      req.logout();
      res.redirect('/');
   });
}

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}