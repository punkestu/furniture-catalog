const express = require("express");
const morgan = require('morgan');
const {log} = require("../lib/logger");
const app = express();

app.use(morgan(':date[iso] :method :url :status'));
app.use(express.json());
app.use(require("../bootstrap/http"));

app.listen(3000, () => {
    log("listen at :3000");
});