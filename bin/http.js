const express = require("express");
const morgan = require('morgan');
const {log} = require("../lib/logger");
const app = express();

app.use(morgan(':date[iso] :method :url :status'));
app.use(express.json());

const handlers = require("../src/handler/http");
app.get("/", handlers.getAllProduct);
app.get("/:id", handlers.getProductByID);
app.post("/", handlers.registerProduct);

app.listen(3000, () => {
    log("listen at :3000");
});