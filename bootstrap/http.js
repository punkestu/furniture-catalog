const dbFurnitureSystem = require("../lib/dbConnector")({
    host: 'localhost',
    user: 'apps',
    password: 'password',
    database: 'furniture_system'
});
const logistic = require("../app/logistic")(dbFurnitureSystem);
const order = require("../app/order")(dbFurnitureSystem, logistic.repo, null);

const router = require("express").Router();
router.use("/logistic", logistic.httpHandler);
router.use("/order", order.httpHandler);

module.exports = router;