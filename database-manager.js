var DatabaseManager = module.exports = {};

var fs = require('fs');

var exampleData;
var filters = {
    languages: ["js", "html", "css", "java", "c", "c#", "c++", "php", "python"],
    lang: ["fr", "en"],
};

DatabaseManager.init = function(address, port) {
    log("Database Manager loaded");

    fs.readFile('exampleData.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        exampleData = { data: JSON.parse(data) }
        log("Example Database loaded");
    });
}

DatabaseManager.getExampleData = function() {
    return exampleData;
}

DatabaseManager.getTutorialById = function() {
    return exampleData;
}

DatabaseManager.getFiltersFor = function(type) {
    // TODO
    return filters[type] || null;
}

function log(text, ...args) {
    console.log("[DBM] ".blue + text.blue, ...args);
}