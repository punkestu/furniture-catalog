// class Order {
//     static #dbConn;
//     static #instance;
//
//     static GetInstance() {
//         if (!this.#instance) {
//             this.#dbConn = require("../../lib/dbConnector")({
//                 host: 'localhost',
//                 user: 'apps',
//                 password: 'password',
//                 database: 'furniture_system'
//             });
//         }
//         return this.#instance;
//     }
// }

module.exports = function (dbConn, productRepo, clientRepo) {
    const repo = require("./repo/order_db").InitInstance(dbConn);
    const service = require("./service/order").InitInstance(repo, productRepo, clientRepo);
    const httpHandler = require("./handler/http")(service);
    return {
        repo, httpHandler
    };
};