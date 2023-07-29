const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const createError = require('http-errors');

const { User } = require('../../models/user');
const { sendEmail } = require('../../helpers');

const signup = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && user.verify) {
        throw createError(409, "Email in use");
    }
    if (user && !user.verify) {
        throw createError(409, "Email in use. Please comfirm your e-mail address, please.")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        verificationToken,
    });

    const msg = {
        to: email,
        subject: 'Confirm your email address',
        html: `<h2>Verify your e-mail to finish signing up for PhoneBook</h2>

        <p>Thank you for choosing PhoneBook</p>

        <p>Please confirm that ${email} is your e-mail address by clicking on this link
            <a target="_blank" href='https://lakei87.github.io/goit-react-hw-08-phonebook/register/${verificationToken}'>https://lakei87.github.io/goit-react-hw-08-phonebook/register/${verificationToken}</a>
        </p>`,
    };

    await sendEmail(msg);

    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
        }
    });

};

module.exports = signup;