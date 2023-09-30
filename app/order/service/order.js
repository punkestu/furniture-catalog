const {ErrNotFound, Errors} = require("../../domain/errors");
const Validator = require("validatorjs");
const {Order: OrderM} = require("../../domain/order");

class Order {
    #repo;
    #productRepo;
    #clientRepo;

    constructor(repo, productRepo, clientRepo) {
        this.#repo = repo;
        this.#productRepo = productRepo;
        this.#clientRepo = clientRepo;
    }

    async CreateOrder(productID, qty, clientID) {
        const validation = new Validator(
            {productID, qty, clientID},
            {
                productID: "required|string",
                qty: "required|integer",
                clientID: "required|string"
            }
        );
        if (!validation.check()) {
            throw new Errors(400, validation.errors);
        }
        if ((await this.#productRepo.Load({ID: productID})).IsEmpty()) {
            throw new Errors(404, ErrNotFound("Product"));
        }
        return this.#repo.Save(new OrderM({productID, qty, state: "ordered", clientID}));
    }

    async GetListOrder(clientID) {
        return (await this.#repo.Load({clientID})).Data();
    }
}

module.exports = Order;