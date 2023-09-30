const {Model} = require("./model");

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

module.exports = {Person};