const express = require("express");
const morgan = require('morgan');
const {log} = require("../lib/logger");
const app = express();

app.use(morgan(':date[iso] :method :url :status'));
app.use(express.json());

const logistic = require("../app/logistic/handler/http");
const order = require("../app/order/handler/http");

app.use("/logistic", logistic);
app.use("/order", order);

app.listen(3000, () => {
    log("listen at :3000");
});