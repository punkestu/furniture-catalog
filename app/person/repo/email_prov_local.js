class Email_prov_local {
    #conn;

    constructor(conn) {
        this.#conn = conn;
    }

    async Save(person) {
        if (person.state === "pending") {
            console.log({
                ID: person.ID,
                command: "register"
            });
        }else{
            console.log({
                ID: person.ID,
                command: "login"
            });
        }
        return person;
    }
}

module.exports = Email_prov_local;