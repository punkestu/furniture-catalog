const {log} = require("../../lib/logger");
const {Errors, ErrNotFound} = require("../domain/errors");
const bootstrap = require("../../lib/bootstrap").GetInstance();
module.exports = {
    getAllProduct: (req, res) => {
        bootstrap.GetProducts()
            .then(products => {
                res.json(products);
            })
            .catch((err) => {
                log(err.stack);
                res.sendStatus(500);
            });
    },
    registerProduct: (req, res) => {
        const {name, price, init_qty} = req.body;
        bootstrap.RegisterProduct(name, price, init_qty)
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
    },
    getProductByID: (req, res) => {
        const {id: ID} = req.params;
        bootstrap.GetProductDetail(ID)
            .then((product)=>{
                res.json(product);
            })
            .catch((err)=>{
                if(err instanceof ErrNotFound){
                    return res.sendStatus(404);
                }
                log(err.stack);
                res.sendStatus(500);
            })
    }
}

