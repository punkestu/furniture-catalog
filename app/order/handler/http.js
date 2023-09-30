const {Errors} = require("../../domain/errors");
const router = require("express").Router();
const bootstrap = require("../index").GetInstance();
router.post("/", async (req, res) => {
    try {
        const {product_id: productID, qty, client_id: clientID} = req.body;
        const {ID} = await bootstrap.CreateOrder(productID, qty, clientID);
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
        const orders = await bootstrap.GetListOrder(clientID);
        res.json(orders);
    } catch (err) {
        console.log(err);
        if (err instanceof Errors) {
            return res.status(err.code).json(err.errors);
        }
        return res.sendStatus(500);
    }
});

module.exports = router;