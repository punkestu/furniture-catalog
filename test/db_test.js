const dbConn = require("../lib/dbConnector")({
    host: 'localhost',
    user: 'apps',
    password: 'password',
    database: 'furniture_system'
})
const repo = require("../src/repo/product_db").InitInstance(dbConn);

async function main() {
    try {
        const created = await repo.Save({
            name: "test product",
            price: 1000,
            qty: 100
        });
        console.log(`${created.ID} Created`);
        console.log(await repo.Load({}));
        const updated = await repo.Save({
            ID: created.ID,
            name: "updated product",
            price: 5000,
            qty: 10
        });
        console.log(`${updated.ID} Updated`);
        console.log(await repo.Load({ID:updated.ID}));
        await repo.Delete(updated.ID)
        console.log(`${updated.ID} Deleted`);
    } catch (e) {
        console.log(e.stack);
    }
    dbConn.destroy();
}

main();