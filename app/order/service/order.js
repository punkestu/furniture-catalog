const {ErrNotFound, Errors} = require("../../domain/errors");
const Validator = require("validatorjs");

class Order {
    static #instance;
    #repo;
    #productRepo;
    #clientRepo;

    constructor(repo, productRepo, clientRepo) {
        this.#repo = repo;
        this.#productRepo = productRepo;
        this.#clientRepo = clientRepo;
    }

    static InitInstance(repo, productRepo, clientRepo) {
        if (!this.#instance) {
            this.#instance = new Order(repo, productRepo, clientRepo);
        }
        return this.#instance;
    }

    static GetInstance() {
        return this.#instance;
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
        // if((await this.#clientRepo.Load({ID: clientID})).length === 0){
        //     throw new Errors(404, ErrNotFound("Client"));
        // }
        if ((await this.#productRepo.Load({ID: productID})).length === 0) {
            throw new Errors(404, ErrNotFound("Product"));
        }
        return this.#repo.Save({productID, qty, state: "ordered", clientID});
    }

    async GetListOrder(clientID) {
        // if((await this.#clientRepo.Load({ID: clientID})).length === 0){
        //     throw new Errors(404, ErrNotFound("Client"));
        // }
        return this.#repo.Load({clientID});
    }
}

module.exports = Order;