class Order {
    static #dbConn;
    static #instance;
    static GetInstance(){
        if(!this.#instance){
            this.#dbConn = require("../../lib/dbConnector")({
                host: 'localhost',
                user: 'apps',
                password: 'password',
                database: 'furniture_system'
            });
            const repo = require("./repo/order_db").InitInstance(this.#dbConn);
            const productRepo = require("../logistic/repo/product_db").GetInstance();
            this.#instance = require("./service/order").InitInstance(repo, productRepo, null);
        }
        return this.#instance;
    }
}

module.exports = Order;