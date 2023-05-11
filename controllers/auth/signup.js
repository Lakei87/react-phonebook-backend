const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const createError = require('http-errors');

const { User } = require('../../models/user');
const { sgMail } = require('../../helpers');
const sendEmail = require('../../helpers/sendEmail');

const signup = async (req, res) => {
    const { email, password } = req.body;

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

    const msg = {
        to: email,
        subject: 'Registration',
        html: `<a target="_blank" href='http://localhost:3000/api/auth/verify/${verificationToken}'>Please, confirm your email address</a>`,
    };

    await sendEmail(msg);

    res.status(201).json({
        email: newUser.email
    });

};

module.exports = signup;