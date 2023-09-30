const {Errors} = require("../../domain/errors");

module.exports = function (service) {
    const router = require("express").Router();
    router.post("/", async (req, res) => {
        try {
            const {product_id: productID, qty, client_id: clientID} = req.body;
            const {ID} = await service.CreateOrder(productID, qty, clientID);
            res.json({created_id: ID});
        } catch (err) {
            console.log(err);
            if (err instanceof Errors) {
                return res.status(err.code).json(err.errors);
            }
            return res.sendStatus(500);
        }
    });

    router.get("/:clientID", async (req, res) => {
        try {
            const {clientID} = req.params;
            const orders = await service.GetListOrder(clientID);
            res.json(orders);
        } catch (err) {
            console.log(err);
            if (err instanceof Errors) {
                return res.status(err.code).json(err.errors);
            }
            return res.sendStatus(500);
        }
    });

    return router;
}
