const { Contact } = require('../../models/contact');

const createError = require('http-errors');

const remove = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
        throw createError(404, `Was not found contact with id: ${id}`);
    };

    res.json({
        message: "Delete success"
    });
};

module.exports = remove;