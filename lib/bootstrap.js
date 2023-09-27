class Bootstrap {
    static #dbConn;
    static #instance;

    static GetInstance() {
        if (!this.#instance) {
            this.#dbConn = require("./dbConnector")({
                host: 'localhost',
                user: 'apps',
                password: 'password',
                database: 'furniture_system'
            });
            const repo = require("../src/repo/product_db").InitInstance(this.#dbConn);
            this.#instance = require("../src/service/logistic").InitInstance(repo);
        }
        return this.#instance;
    }
}

module.exports = Bootstrap;