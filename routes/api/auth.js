const express = require('express');

const { signup, login, verificationToken } = require('../../controllers/auth');
const { validateBody } = require('../../middlewares');
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

router.post('/logout');
router.get('/current');

module.exports = router;