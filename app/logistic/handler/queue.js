const router = require("../../../lib/mbRouter");

module.exports = function (service) {
    return router({
        "register": async ({name, price, initQty}) => {
            const {ID} = await service.RegisterProduct(name, price, initQty);
            console.log(ID);
        }
    });
}