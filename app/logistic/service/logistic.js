const Validator = require("validatorjs");
const {ErrNotFound, Errors} = require("../../domain/errors");
const {Product} = require("../../domain/product");

class Logistic {
    static #instance;

    constructor(repo) {
        this.repo = repo;
    }

    async RegisterProduct(name, price, initQty) {
        const validation = new Validator(
            {name, price, init_qty: initQty},
            {
                name: "required|string",
                price: "required|integer",
                init_qty: "required|integer"
            });
        if (!validation.check()) {
            throw new Errors(400, validation.errors);
        }
        return this.repo.Save(new Product({name, price, qty: initQty}));
    }

    async GetProducts() {
        return (await this.repo.Load({})).Data();
    }

    async GetProductDetail(ID) {
        const products = await this.repo.Load({ID});
        if (products.Count() === 0) {
            throw new ErrNotFound("Product");
        }
        return products.First();
    }

    static InitInstance(repo) {
        if (!this.#instance) {
            this.#instance = new Logistic(repo);
        }
        return this.#instance;
    }

    static GetInstance() {
        return this.#instance;
    }
}

module.exports = Logistic;