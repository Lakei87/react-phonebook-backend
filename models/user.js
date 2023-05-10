const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            match: emailRegexp,
            required: [true, 'Email is required'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        token: {
            type: String,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },
    },
    { versionKey: false }
);

// Joi schemas
const signupAndLoginSchema = Joi.object({
    password: Joi.string().min(7).max(20).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    name: Joi.string().required(),
});

const schemas = {
    signupAndLoginSchema,
};

const User = model("users", userSchema);
module.exports = {
    User,
    schemas,
};