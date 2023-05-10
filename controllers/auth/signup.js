const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const createError = require('http-errors');

const { User } = require('../../models/user');

const signup = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, "Email in use");
    };

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        verificationToken,
    });

    res.status(201).json({
        email: newUser.email
    });

};

module.exports = signup;