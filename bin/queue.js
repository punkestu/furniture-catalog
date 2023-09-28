const queue = require("../lib/mbConnector")
    .GetInstance("client1", ["localhost:9092"]);
const logistic = require("../app/logistic/handler/queue");

queue.Fetch("logistic", logistic).then(() => console.log("Logistic service is running"));