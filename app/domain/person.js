const {Model, Models} = require("./model");

class Person extends Model {
    name;
    email;
    role;
    state;

    constructor({ID, name, email, role, state}) {
        super(ID);
        this.name = name;
        this.email = email;
        this.role = role;
        this.state = state;
    }
}

class Persons extends Models {
    constructor(persons) {
        super(persons);
    }

    Names() {
        return this.Data().map(person => {
            return person.name;
        });
    }
    Emails() {
        return this.Data().map(person => {
            return person.email;
        });
    }
}

module.exports = {Person, Persons};