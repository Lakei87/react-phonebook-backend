const createError = require('http-errors');
const { User } = require('../../models/user');
const { sendEmail } = require('../../helpers');

const reverificationToken = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw createError(404, "User not found");
    };
    if (user.verify) {
        throw createError(400, "Verification has already been passed");
    };

    const msg = {
        to: email,
        subject: 'Confirm your email address',
        html: `<h2>Verify your e-mail to finish signing up for PhoneBook</h2>

        <p>Thank you for choosing PhoneBook</p>

        <p>Please confirm that ${email} is your e-mail address by clicking on this link
            <a target="_blank" href='https://lakei87.github.io/goit-react-hw-08-phonebook/register/${user.verificationToken}'>https://lakei87.github.io/goit-react-hw-08-phonebook/register/${user.verificationToken}</a>
        </p>`,
    };

    await sendEmail(msg);
    res.json({
        "message": "Verification email sent"
    });
};

module.exports = reverificationToken;