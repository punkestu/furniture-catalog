const {Product, Products} = require("../../domain/product");
const tName = "products";

class Product_db {
    constructor(conn) {
        this.conn = conn;
    }

    async Save(product) {
        try {
            if (!product.ID) {
                product.GenerateID();
                await this.conn.queryAsync(`INSERT INTO ${tName} VALUES(?,?,?,?)`, [product.ID, product.name, product.price, product.qty]);
            } else {
                await this.conn.queryAsync(`UPDATE ${tName} SET name=?, price=?, qty=? WHERE id=?`, [product.name, product.price, product.qty, product.ID]);
            }
        } catch (e) {
            throw e;
        }
        return product;
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
        const products = (await this.conn.queryAsync(
            query + (sets.length > 0 ? " WHERE " : "") + sets.join(" AND "), pars
        )).map(product => {
            return new Product({ID: product.id, ...product});
        });
        return new Products(products);
    }

    async Delete(ID) {
        return this.conn.queryAsync(`DELETE FROM ${tName} WHERE id=?`, [ID]);
    }
}

module.exports = Product_db;