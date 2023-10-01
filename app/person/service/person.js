const {Person: PersonM} = require("../../domain/person");
const {ErrNotFound} = require("../../domain/errors");

class Person {
    #dbRepo;
    #emailProv;
    #jwt;
    #queue;

    constructor(dbRepo, emailProv, jwt, queue) {
        this.#dbRepo = dbRepo;
        this.#emailProv = emailProv;
        this.#jwt = jwt;
        this.#queue = queue;
    }

    async Register(name, email) {
        const person = await this.#dbRepo.Save(new PersonM({name, email, role: "client", state: "pending"}));
        await this.#queue.Push("person", "register", person);
        return person;
    }

    async Login(email) {
        const persons = await this.#dbRepo.Load({email});
        if (persons.IsEmpty()) {
            throw new ErrNotFound("Person");
        }
        await this.#queue.Push("person", "register", persons.First());
        return persons.First();
    }

    async SendMail(person){
        return await this.#emailProv.Save(person);
    }

    async ConfirmPerson(token) {
        const {ID, command} = this.#jwt.verify(token);
        let person;
        if (command === "register") {
            person = await this.#dbRepo.Save(new PersonM({ID, state: "confirmed"}));
        } else if (command === "login") {
            person = (await this.#dbRepo.Load({ID})).First();
        }
        return this.#jwt.sign({ID: person.ID, command: "authToken"});
    }
}