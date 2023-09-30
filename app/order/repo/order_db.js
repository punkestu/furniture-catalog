const {nanoid} = require("nanoid");
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

    async Save({ID, productID, qty, state, clientID}) {
        try {
            if (typeof ID === 'undefined') {
                ID = nanoid(8);
                await this.#conn.queryAsync(`INSERT INTO ${tName} VALUES (?,?,?,?,?)`, [ID, productID, qty, state, clientID]);
            }else{
                const query = `UPDATE ${tName}`;
                let sets = [];
                let pars = [];
                if (typeof productID !== 'undefined') {
                    sets.push("product_id=?");
                    pars.push(productID);
                }
                if (typeof qty !== 'undefined') {
                    sets.push("qty=?");
                    pars.push(qty);
                }
                if (typeof state !== 'undefined') {
                    sets.push("state=?");
                    pars.push(state);
                }
                if (typeof clientID !== 'undefined') {
                    sets.push("client_id=?");
                    pars.push(clientID);
                }
                pars.push(ID);
                await this.#conn.queryAsync(query + (sets.length > 0 ? " SET " : "") + sets.join(",") + " WHERE id=?", pars);
            }
        } catch (err) {
            throw err;
        }

        return {ID};
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
        return this.#conn.queryAsync(query + (sets.length > 0 ? " WHERE " : "") + sets.join(" AND "), pars);
    }
    async Delete(ID) {
        return this.#conn.queryAsync(`DELETE FROM ${tName} WHERE id=?`, [ID]);
    }
}

module.exports = Order_db;