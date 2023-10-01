const {Person} = require("../../domain/person");
const {Models} = require("../../domain/model");
const tName = "persons";

class Person_db {
    #conn;
    constructor(conn) {
        this.#conn = conn;
    }
    async Save(person){
        if(!person.ID){
            person.GenerateID();
            await this.#conn.queryAsync(`INSERT INTO ${tName} VALUES(?,?,?,?,?)`, [person.ID, person.name, person.email, person.role, person.state]);
        }else{
            await this.#conn.queryAsync(`UPDATE ${tName} SET name=?, email=?, role=?, state=? WHERE id=?`, [person.name, person.email, person.role, person.state, person.ID]);
        }
        return person;
    }

    async Load({ID, email}) {
        let query = `SELECT * FROM ${tName}`;
        let sets = [];
        let pars = [];
        if (typeof ID !== 'undefined') {
            sets.push("id=?");
            pars.push(ID);
        }
        if (typeof email !== 'undefined') {
            sets.push("email=?");
            pars.push(email);
        }
        const persons = (await this.#conn.queryAsync(
            query + (sets.length > 0 ? " WHERE " : "") + sets.join(" AND "), pars
        )).map(person => {
            return new Person({ID: person.id, ...person});
        });
        return new Models(persons);
    }
}

module.exports = Person_db;