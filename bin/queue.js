const queue = require("../lib/mbConnector")
    .GetInstance("client1", ["localhost:9092"]);
const router = require("../bootstrap/queue");

router(queue);