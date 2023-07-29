const { User } = require('../../models/user');
const createError = require('http-errors');

const verificationToken = async (req, res) => {
    const { verificationToken } = req.params;
    const findedUser = await User.findOne({ verificationToken });
    
    if (!findedUser) {
        throw createError(404, "User not found");
    };

    const verifiedUser = await User.findByIdAndUpdate(findedUser._id, { verify: true, verificationToken: "" }, {new: true});
    res.json({
        message: "Verification successful. Please login.",
        verifiedUser,
    });
};

module.exports = verificationToken;