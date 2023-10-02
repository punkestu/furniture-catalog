const {ErrForbidden, ErrUnauthorized} = require("../domain/errors");
const {Verify} = require("../../lib/jwt");

module.exports = function (clientRepo) {
    return {
        TokenValidation: async (req, res, next) => {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json(new ErrUnauthorized("Token is invalid"));
            }
            const {ID, role, auth} = Verify(token);
            if (!auth) {
                return res.status(403).json(new ErrForbidden("Token is invalid"));
            }
            if ((await clientRepo.Load({ID})).IsEmpty()) {
                return res.status(403).json(new ErrForbidden("Token is invalid"));
            }
            req.body.client_id = ID;
            req.body.role = role;
            next();
        },
        IsAdmin: (req, res, next) => {
            if (req.body.role !== "admin") {
                return res.status(403).json(new ErrForbidden("Role is invalid"));
            }
            next();
        }
    }
}