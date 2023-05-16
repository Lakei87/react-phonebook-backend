const signup = require('./signup');
const login = require('./login');
const verificationToken = require('./verificationToken');
const reverificationToken = require('./reverificationToken');
const logout = require('./logout');
const current = require('./current');

module.exports = {
    signup,
    login,
    verificationToken,
    reverificationToken,
    logout,
    current,
};