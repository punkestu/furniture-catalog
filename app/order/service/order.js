const {ErrNotFound, Errors, ErrForbidden, ErrOutOfStock, ErrUnauthorized} = require("../../domain/errors");
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
        if ((await this.#clientRepo.Load({ID: clientID})).IsEmpty()){
            throw new Errors(401, new ErrUnauthorized("Client id invalid"));
        }
        const product = (await this.#productRepo.Load({ID: productID})).First();
        if (!product) {
            throw new Errors(404, new ErrNotFound("Product"));
        }
        product.qty -= qty;
        if(product.qty < 0){
            throw new Errors(404, new ErrOutOfStock());
        }
        await this.#productRepo.Save(product);
        return this.#repo.Save(new OrderM({productID, qty, state: "ordered", clientID}));
    }

    async GetListOrder(clientID) {
        if ((await this.#clientRepo.Load({ID: clientID})).IsEmpty()){
            throw new Errors(403, new ErrForbidden("Client id invalid"));
        }
        return (await this.#repo.Load({clientID})).Data();
    }
}

module.exports = Order;