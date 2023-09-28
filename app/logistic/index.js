class Logistic {
    static #dbConn;
    static #instance;

    static GetInstance() {
        if (!this.#instance) {
            this.#dbConn = require("../../lib/dbConnector")({
                host: 'localhost',
                user: 'apps',
                password: 'password',
                database: 'furniture_system'
            });
            const repo = require("./repo/product_db").InitInstance(this.#dbConn);
            this.#instance = require("./service/logistic").InitInstance(repo);
        }
        return this.#instance;
    }
}

module.exports = Logistic;