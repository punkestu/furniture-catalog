const dbFurnitureSystem = require("../lib/dbConnector")({
    host: 'localhost',
    user: 'apps',
    password: 'password',
    database: 'furniture_system'
});

module.exports = function (broker) {
    const logistic = require("../app/logistic")(dbFurnitureSystem);
    const person = require("../app/person")(dbFurnitureSystem, broker);
    broker.Fetch("logistic-service", "logistic", logistic.queueHandler)
        .then(() => console.log("Logistic service is running"));
    broker.Fetch("person-service", "person", person.queueHandler)
        .then(() => console.log("Person service is running"));
}