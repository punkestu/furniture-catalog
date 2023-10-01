const queue = require("../lib/mbConnector").GetInstance();

queue.CreateTopic("logistic").then(()=>console.log("Logistic topic created")).catch();
queue.CreateTopic("person").then(()=>console.log("Person topic created")).catch();