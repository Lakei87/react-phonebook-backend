const { Contact } = require('../../models/contact');

const add = async (req, res) => {
    const { _id: owner } = req.user;
    const contact = await Contact.create({ ...req.body, owner });

    res.status(201).json(contact);
};

module.exports = add;