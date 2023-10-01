const {Person: PersonM} = require("../../domain/person");
const {ErrNotFound, Errors} = require("../../domain/errors");
const Validator = require("validatorjs");

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
        const validation = new Validator(
            {name, email},
            {
                name: ["required", {"not_in": (await this.#dbRepo.Load({})).Names()}, "string"],
                email: ["required", {"not_in": (await this.#dbRepo.Load({})).Emails()}, "email"]
            });
        if (!validation.check()) {
            throw new Errors(400, validation.errors);
        }
        const person = await this.#dbRepo.Save(new PersonM({name, email, role: "client", state: "pending"}));
        await this.#queue.Push("person", "send-mail", JSON.stringify(person));
        return person;
    }

    async Login(email) {
        const validation = new Validator(
            {email},
            {
                email: "required|email"
            });
        if (!validation.check()) {
            throw new Errors(400, validation.errors);
        }
        const persons = await this.#dbRepo.Load({email});
        if (persons.IsEmpty()) {
            throw new Errors(404, new ErrNotFound("Person"));
        }
        await this.#queue.Push("person", "send-mail", JSON.stringify(persons.First()));
        return persons.First();
    }

    async SendMail(person) {
        return setTimeout(() => {
            return this.#emailProv.Save(person);
        }, 5000);
    }

    async ConfirmPerson(ID, command) {
        let person;
        if (command === "register") {
            person = (await this.#dbRepo.Load({ID})).First();
            if (!person) {
                throw new Errors(404, new ErrNotFound("Person"));
            }
            if (person.state === "pending") {
                person.state = "confirmed";
                person = await this.#dbRepo.Save(person);
            }
        } else if (command === "login") {
            person = (await this.#dbRepo.Load({ID})).First();
        }
        return person;
    }
}

module.exports = Person;