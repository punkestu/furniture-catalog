class Email_prov_local {
    #conn;

    constructor(conn) {
        this.#conn = conn;
    }

    async Save(person) {
        if (person.state === "pending") {
            console.log(`localhost:3000/person/auth?id=${person.ID}&command=register`);
        }else{
            console.log(`localhost:3000/person/auth?id=${person.ID}&command=login`);
        }
        return person;
    }
}

module.exports = Email_prov_local;