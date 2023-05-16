const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * 10;

    const result = await Contact
        .find(
            favorite ? { owner, favorite } : { owner },
            null,
            { skip, limit })
        .populate("owner", "_id, email");

    res.json((result.length === 0 ? "Your contactList is empty" : result));
};

module.exports = getAll;