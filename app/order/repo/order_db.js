const {nanoid} = require("nanoid");
const {Order, Orders} = require("../../domain/order");
const tName = "orders";

class Order_db {
    static #instance;
    #conn;

    constructor(conn) {
        this.#conn = conn;
    }

    static InitInstance(conn) {
        if (!this.#instance) {
            this.#instance = new Order_db(conn);
        }
        return this.#instance;
    }

    static GetInstance() {
        return this.#instance;
    }

    async Save(order) {
        try {
            if (!order.ID) {
                order.ID = nanoid(8);
                await this.#conn.queryAsync(`INSERT INTO ${tName} VALUES (?,?,?,?,?)`, [order.ID, order.productID, order.qty, order.state, order.clientID]);
            } else {
                await this.#conn.queryAsync(`UPDATE ${tName} SET product_id=?, qty=?, state=? client_id=? WHERE id=?`, [order.productID, order.qty, order.state, order.clientID, order.ID]);
            }
        } catch (err) {
            throw err;
        }

        return order;
    }

    async Load({ID, productID, clientID}) {
        let query = `SELECT * FROM ${tName}`;
        let sets = [];
        let pars = [];
        if (typeof ID !== 'undefined') {
            sets.push("id=?");
            pars.push(ID);
        }
        if (typeof productID !== 'undefined') {
            sets.push("product_id=?");
            pars.push(productID);
        }
        if (typeof clientID !== 'undefined') {
            sets.push("client_id=?");
            pars.push(clientID);
        }
        const orders = (await this.#conn.queryAsync(
            query + (sets.length > 0 ? " WHERE " : "") + sets.join(" AND "), pars
        )).map(order => {
            return new Order({ID: order.id, productID: order.product_id, clientID: order.client_id, ...order});
        });
        return new Orders(orders);
    }

    async Delete(ID) {
        return this.#conn.queryAsync(`DELETE FROM ${tName} WHERE id=?`, [ID]);
    }
}

module.exports = Order_db;