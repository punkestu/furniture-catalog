const Promise = require("bluebird");
const mysql = require('mysql');

module.exports = (connOpt) => {
    return Promise.promisifyAll(mysql.createConnection(connOpt));
}