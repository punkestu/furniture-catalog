module.exports = function (dbConn, clientRepo) {
    const repo = new (require("./repo/product_db"))(dbConn);
    const service = new (require("./service/logistic"))(repo);
    const personMidd = require("../middleware/person")(clientRepo);
    const httpHandler = require("./handler/http")(service, personMidd);
    const queueHandler = require("./handler/queue")(service);
    return {
        repo, httpHandler, queueHandler
    };
}