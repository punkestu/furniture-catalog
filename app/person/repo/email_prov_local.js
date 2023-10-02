const jwt = require("../../../lib/jwt");

class Email_prov_local {
    #conn;

    constructor(conn) {
        this.#conn = conn;
    }

    async Save(person) {
        const code = {
            ID: person.ID,
            command: ""
        };
        if (person.state === "pending") {
            code.command = "register";
        } else {
            code.command = "login";
        }
        console.log(`http://localhost:3000/person/auth?code=${jwt.Sign(code)}`);
        return person;
    }
}

module.exports = Email_prov_local;