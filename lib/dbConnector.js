const mysql = require('mysql');
const util = require("util");

module.exports = (connOpt) => {
    const conn = mysql.createConnection(connOpt);
    return {
        queryAsync: util.promisify(conn.query).bind(conn)
    }
}