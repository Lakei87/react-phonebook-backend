const express = require('express');

const {
    signup,
    login,
    verificationToken,
    reverificationToken,
    logout } = require('../../controllers/auth');
const { validateBody, authenticate } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup',
    validateBody(schemas.signupSchema),
    ctrlWrapper(signup));

router.post('/login',
    validateBody(schemas.loginSchema),
    ctrlWrapper(login));

router.get('/verify/:verificationToken',
    ctrlWrapper(verificationToken));

router.post('/verify',
    validateBody(schemas.reverificationTokenSchema),
    ctrlWrapper(reverificationToken));

router.post('/logout',
    authenticate,
    ctrlWrapper(logout));
    
router.get('/current');

module.exports = router;