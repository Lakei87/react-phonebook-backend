const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Mongoose schema
const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { versionKey: false }
);

// Joi schemas
const add = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().required(),
});

const schemas = {
    add,
};

const Contact = model("contacts", contactSchema);

module.exports = {
    Contact,
    schemas,
};