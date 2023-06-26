const current = async (req, res) => {
    const { email, name } = req.user;

    res.status(200).json({
        name,
        email,
    });
};

module.exports = current;