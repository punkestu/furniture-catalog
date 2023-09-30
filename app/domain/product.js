const {Model, Models} = require("./model");

class Product extends Model {
    name;
    price;
    qty;

    constructor({ID, name, price, qty}) {
        super(ID);
        this.name = name;
        this.price = price;
        this.qty = qty;
    }

    Valuation() {
        return this.qty * this.price;
    }
}

class Products extends Models {
    constructor(products) {
        super(products);
    }

    Valuation() {
        return this.Data().reduce((total, product) => {
            return total + product.Valuation();
        });
    }
}

module.exports = {Product, Products}