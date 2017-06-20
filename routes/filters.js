var Filters = module.exports = {};

var filters = {
   languages: ["js", "html", "css", "java", "c", "c#", "c++", "php", "python"],
   lang: ["fr", "en"],
   technology: ["AngularJS", "React", "Angular 2", "Angular 4", "jQuery", "NodeJS"],
   type: ["Video", "Blog", "Github"]
};

Filters.init = function (app) {
   app.get('/filters', function (req, res) {
      res.send(filters);
   });

   app.get('/filters/:type', function (req, res) {
      if (filters[req.params.type]) {
         res.send(filters[req.params.type]);
      } else {
         res.status(404).send('Filter not found');
      }
   })
}