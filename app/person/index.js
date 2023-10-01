module.exports = function (dbConn, queue) {
    const repo = new (require("./repo/person_db"))(dbConn);
    const emailProv = new (require("./repo/email_prov_local"))(null);
    const service = new (require("./service/person"))(repo, emailProv, queue);
    const httpHandler = require("./handler/http")(service);
    const queueHandler = require("./handler/queue")(service);
    return {
        repo, httpHandler, queueHandler
    };
};