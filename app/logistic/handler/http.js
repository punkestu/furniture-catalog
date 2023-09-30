const {log} = require("../../../lib/logger");
const {Errors, ErrNotFound} = require("../../domain/errors");

module.exports = function (service) {
    const router = require("express").Router();
    router.get("/", (req, res) => {
        service.GetProducts()
            .then(products => {
                res.json(products);
            })
            .catch((err) => {
                log(err.stack);
                res.sendStatus(500);
            });
    });

    router.post("/", (req, res) => {
        const {name, price, init_qty} = req.body;
        service.RegisterProduct(name, price, init_qty)
            .then(({ID}) => {
                res.status(201).json({"created_id": ID});
            })
            .catch((err) => {
                if (err instanceof Errors) {
                    return res.status(err.code).json(err.errors);
                }
                log(err.stack);
                res.sendStatus(500);
            });
    });

    router.get("/:id", (req, res) => {
        const {id: ID} = req.params;
        service.GetProductDetail(ID)
            .then((product) => {
                res.json(product);
            })
            .catch((err) => {
                if (err instanceof ErrNotFound) {
                    return res.sendStatus(404);
                }
                log(err.stack);
                res.sendStatus(500);
            })
    });
    return router;
}