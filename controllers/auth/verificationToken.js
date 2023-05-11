const { User } = require('../../models/user');
const createError = require('http-errors');

const verificationToken = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    
    if (!user) {
        throw httpError(404, "User not found");
    };

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

    res.json({
        message: "Verification successful"
    });
};

module.exports = verificationToken;