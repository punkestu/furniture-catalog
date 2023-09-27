const {nanoid} = require("nanoid");

class Product_local {
    static #instance;
    products = [];

    Save({ID, name, price, qty}) {
        if (!ID) {
            ID = nanoid(8);
            this.products.push({ID, name, qty, price});
        }
        return {ID};
    }

    Load({ID, name}) {
        return this.products.filter(product => {
            let valid = true;
            if (ID) valid = valid && product.ID === ID;
            if (name) valid = valid && product.name === name;
            return valid;
        })
    }

    static InitInstance() {
        if (!this.#instance) {
            this.#instance = new Product_local();
        }
        return this.#instance;
    }

    static GetInstance() {
        return this.#instance;
    }
}

module.exports = Product_local;