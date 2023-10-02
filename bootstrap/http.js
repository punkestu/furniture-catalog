const dbFurnitureSystem = require("../lib/dbConnector")({
    host: 'localhost',
    user: 'apps',
    password: 'password',
    database: 'furniture_system'
});
const queue = require("../lib/mbConnector")
    .GetInstance("server1", ["localhost:9092"]);

const person = require("../app/person")(dbFurnitureSystem, queue);
const logistic = require("../app/logistic")(dbFurnitureSystem, person.repo);
const order = require("../app/order")(dbFurnitureSystem, logistic.repo, person.repo);

const router = require("express").Router();
router.use("/logistic", logistic.httpHandler);
router.use("/order", order.httpHandler);
router.use("/person", person.httpHandler);

module.exports = router;