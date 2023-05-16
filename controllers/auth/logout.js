const { User } = require("../../models/user");
const createError = require('http-errors');

const logout = async (req, res) => {
    const { _id } = req.user;

    const user = await User.findByIdAndUpdate(_id, { token: "" });
    if (!user) {
        throw createError(401, "Not authorized");
    }

    res.status(204).json();
};

module.exports = logout;