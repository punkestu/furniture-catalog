const {Errors} = require("../../domain/errors");
module.exports = function (service) {
    const router = require("express").Router();
    router.post("/registration", async (req, res) => {
        try {
            const {name, email} = req.body;
            const person = await service.Register(name, email);
            res.json({
                state: "wait for email"
            });
        } catch (err) {
            console.log(err);
            if (err instanceof Errors) {
                return res.status(err.code).json(err.errors);
            }
            return res.sendStatus(500);
        }
    });
    router.post("/login", async (req, res) => {
        try {
            const {email} = req.body;
            await service.Login(email);
            res.json({
                state: "wait for email"
            });
        } catch (err) {
            console.log(err);
            if (err instanceof Errors) {
                return res.status(err.code).json(err.errors);
            }
            return res.sendStatus(500);
        }
    });
    router.get("/auth", async (req, res) => {
        try {
            const {id: ID, command} = req.query;
            const person = await service.ConfirmPerson(ID, command);
            res.json(person);
        } catch (err) {
            console.log(err);
            if (err instanceof Errors) {
                return res.status(err.code).json(err.errors);
            }
            return res.sendStatus(500);
        }
    })
    return router;
}