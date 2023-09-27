const conn = require("../lib/dbConnector")({
    host: 'localhost',
    user: 'apps',
    password: 'password',
    database: 'furniture_system'
});
const repo = require("../src/repo/product_db").InitInstance(conn);
const service = require("../src/service/logistic").InitInstance(repo);

async function main() {
    try {
        const registered = await service.RegisterProduct("product registered", 100, 10);
        console.log(await service.GetProducts());
        console.log(await service.GetProductDetail(registered.ID));
        console.log(await service.GetProductDetail("hello"));
    } catch (e) {
        console.log(e.stack);
    }
}

main().then();