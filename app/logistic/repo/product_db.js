const {nanoid} = require("nanoid");
const tName = "products";

class Product_db {
    static #instance;

    constructor(conn) {
        this.conn = conn;
    }

    async Save({ID, name, price, qty}) {
        try {
            if (typeof ID === 'undefined') {
                ID = nanoid(8);
                await this.conn.queryAsync(`INSERT INTO ${tName} VALUES(?,?,?,?)`, [ID, name, price, qty]);
            } else {
                const query = `UPDATE ${tName}`;
                let sets = [];
                let pars = [];
                if (typeof name !== 'undefined') {
                    sets.push("name=?");
                    pars.push(name);
                }
                if (typeof price !== 'undefined') {
                    sets.push("price=?");
                    pars.push(price);
                }
                if (typeof qty !== 'undefined') {
                    sets.push("qty=?");
                    pars.push(qty);
                }
                pars.push(ID);
                await this.conn.queryAsync(query + (sets.length > 0 ? " SET " : "") + sets.join(",") + " WHERE id=?", pars);
            }
        } catch (e) {
            throw e;
        }
        return {ID};
    }

    async Load({ID, name}) {
        let query = `SELECT * FROM ${tName}`;
        let sets = [];
        let pars = [];
        if (typeof ID !== 'undefined') {
            sets.push("id=?");
            pars.push(ID);
        }
        if (typeof name !== 'undefined') {
            sets.push("name=?");
            pars.push(name);
        }
        return this.conn.queryAsync(query + (sets.length > 0 ? " WHERE " : "") + sets.join(" AND "), pars);
    }

    async Delete(ID) {
        return this.conn.queryAsync(`DELETE FROM ${tName} WHERE id=?`, [ID]);
    }

    static InitInstance(conn) {
        if (!this.#instance) {
            this.#instance = new Product_db(conn);
        }
        return this.#instance;
    }

    static GetInstance() {
        return this.#instance;
    }
}

module.exports = Product_db;