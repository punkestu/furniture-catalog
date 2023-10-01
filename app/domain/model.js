const {nanoid} = require("nanoid");

class Model {
    ID;

    constructor(ID) {
        this.ID = ID;
    }

    GenerateID() {
        if (!this.ID) {
            this.ID = nanoid(8);
        }
    }

    JSON() {
        return {...this};
    }
}

class Models {
    #data;

    constructor(data) {
        this.#data = data;
    }

    Data() {
        return this.#data;
    }

    Count() {
        return this.#data.length;
    }

    IsEmpty() {
        return this.#data.length === 0;
    }

    First() {
        return this.#data[0];
    }

    JSON() {
        return this.#data.map(d=>{
            return {...d};
        });
    }
}

module.exports = {Model, Models};