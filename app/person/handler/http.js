const {Errors} = require("../../domain/errors");
const jwt = require("../../../lib/jwt");

module.exports = function (service) {
    const router = require("express").Router();
    router.post("/registration", async (req, res) => {
        try {
            const {name, email} = req.body;
            await service.Register(name, email);
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
            const {code} = req.query;
            const {ID, command} = jwt.Verify(code);
            const person = await service.ConfirmPerson(ID, command);
            res.json({access_token: jwt.Sign({ID: person.ID, role: person.role, auth: true})});
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