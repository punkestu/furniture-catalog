const router = require("../../../lib/mbRouter");
const bootstrap = require("../index").GetInstance();

module.exports = router({
    "register": async function ({name, price, initQty}) {
        const {ID} = await bootstrap.RegisterProduct(name, price, initQty);
        console.log(ID);
    }
})