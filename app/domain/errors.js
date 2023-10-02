class ErrNotFound extends Error {
    constructor(objName) {
        super(`not found`);
        this.name = "Not Found Error";
        this.cause = objName;
    }
}

class ErrForbidden extends Error {
    constructor(cause) {
        super("forbidden");
        this.name = "Forbidden";
        this.cause = cause;
    }
}

class ErrOutOfStock extends Error{
    constructor() {
        super("out of stock");
        this.name = "Out of stock";
        this.cause = "Product"
    }
}

class ErrUnauthorized extends Error{
    constructor(cause) {
        super("unauthorized");
        this.name = "Unauthorized";
        this.cause = cause;
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
    ErrForbidden,
    ErrOutOfStock,
    ErrUnauthorized,
    Errors
};