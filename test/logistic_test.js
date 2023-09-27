const pr = require("../src/repo/product_local").InitInstance();
const ls = require("../src/service/logistic").InitInstance(pr);

ls.RegisterProduct("product1", 1000, 100)
    .then(({ID}) => {
        ls.GetProducts()
            .then(products => {
                console.log(products);
            })
        ls.GetProductDetail(ID)
            .then(product => {
                console.log(product);
            })
    })