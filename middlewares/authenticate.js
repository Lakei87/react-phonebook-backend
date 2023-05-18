const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

const createError = require('http-errors');
const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        throw createError(401, "Not authorized");
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        
        if (!user || !user.token) {
            throw createError(401, "Not authorized");
        };

        req.user = user;
        next();
    } catch (error) {
        next(createError(401, "Not authorized"));
    }
};

module.exports = authenticate;