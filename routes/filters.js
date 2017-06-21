var Filters = module.exports = {};

var filters = {
   language: ["JS", "HTML", "CSS"],
   lang: ["Français", "English"],
   techno: ["AngularJS", "React", "Angular 2", "Angular 4", "jQuery", "NodeJS"],
   media: ["Video", "Website", "Github"],
   price: {min: 0, max: 50}
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