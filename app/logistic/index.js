module.exports = function (dbConn) {
    const repo = new (require("./repo/product_db"))(dbConn);
    const service = new (require("./service/logistic"))(repo);
    const httpHandler = require("./handler/http")(service);
    const queueHandler = require("./handler/queue")(service);
    return {
        repo, httpHandler, queueHandler
    };
}