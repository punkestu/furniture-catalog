const {Person: PersonM} = require("../../domain/person");
const {ErrNotFound} = require("../../domain/errors");

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

    async ConfirmPerson(ID, command) {
        let person;
        if (command === "register") {
            person = await this.#dbRepo.Save(new PersonM({ID, state: "confirmed"}));
        } else if (command === "login") {
            person = (await this.#dbRepo.Load({ID})).First();
        }
        return person;
    }
}