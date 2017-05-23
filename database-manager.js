var DatabaseManager = module.exports = {};

var fs = require('fs');

var exampleData;

DatabaseManager.init = function(address, port) {
    console.log("Database Manager loaded".green);

    var dataTemp;
    fs.readFile('exampleData.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        exampleData = JSON.parse(data);
        console.log("Example database loaded".green);
    });
}

DatabaseManager.getExampleData = function() {
    return exampleData;
}

DatabaseManager.getTutorialById = function() {
    return exampleData;
}