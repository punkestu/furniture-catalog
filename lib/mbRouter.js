const {Errors} = require("../app/domain/errors");
module.exports = (handlers) => {
    return async function ({message}) {
        try {
            const key = message.key.toString();
            const data = JSON.parse(message.value.toString());
            if (handlers.hasOwnProperty(key)){
                await handlers[key](data);
            }
        } catch (err) {
            if(err instanceof Errors){
                switch (err.code) {
                    case 400:
                        console.log(err.errors);
                        break;
                }
            }
            console.log(err);
        }
    }
}