class ErrNotFound extends Error {
    constructor(objName) {
        super(`not found`);
        this.name = "Not Found Error";
        this.cause = objName;
    }
}

class Errors {
    errors;
    code;
    constructor(code, errs) {
        this.errors = errs;
        this.code = code;
    }
}

module.exports = {
    ErrNotFound,
    Errors
};