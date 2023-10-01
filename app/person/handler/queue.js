const router = require("../../../lib/mbRouter");

module.exports = function (service) {
    return router({
        "send-mail": async (person) => {
            await service.SendMail(person);
        }
    })
}