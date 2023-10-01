const {Person: PersonM} = require("../../domain/person");
const {ErrNotFound, Errors} = require("../../domain/errors");

class Person {
    #dbRepo;
    #emailProv;
    #queue;

    constructor(dbRepo, emailProv, queue) {
        this.#dbRepo = dbRepo;
        this.#emailProv = emailProv;
        this.#queue = queue;
    }

    async Register(name, email) {
        const person = await this.#dbRepo.Save(new PersonM({name, email, role: "client", state: "pending"}));
        await this.#queue.Push("person", "send-mail", JSON.stringify(person));
        return person;
    }

    async Login(email) {
        const persons = await this.#dbRepo.Load({email});
        if (persons.IsEmpty()) {
            throw new ErrNotFound("Person");
        }
        await this.#queue.Push("person", "send-mail", JSON.stringify(persons.First()));
        return persons.First();
    }

    async SendMail(person){
        return setTimeout(() => {
            return this.#emailProv.Save(person);
        }, 5000);
    }

    async ConfirmPerson(ID, command) {
        let person;
        if (command === "register") {
            person = (await this.#dbRepo.Load({ID})).First();
            if(!person){
                throw new Errors(404, new ErrNotFound("Person"));
            }
            person.state = "confirmed";
            person = await this.#dbRepo.Save(person);
        } else if (command === "login") {
            person = (await this.#dbRepo.Load({ID})).First();
        }
        return person;
    }
}

module.exports = Person;