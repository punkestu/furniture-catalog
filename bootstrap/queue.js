const dbFurnitureSystem = require("../lib/dbConnector")({
    host: 'localhost',
    user: 'apps',
    password: 'password',
    database: 'furniture_system'
});
const logistic = require("../app/logistic")(dbFurnitureSystem);

module.exports = function (broker) {
    broker.Fetch("logistic-service", "logistic", logistic.queueHandler)
        .then(() => console.log("Logistic service is running"));
}