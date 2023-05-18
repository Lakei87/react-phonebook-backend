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
        subject: 'Registration',
        html: `<a target="_blank" href='http://localhost:3001/api/auth/verify/${user.verificationToken}'>Please, confirm your email address</a>`
    };

    await sendEmail(msg);
    res.json({
        "message": "Verification email sent"
    });
};

module.exports = reverificationToken;