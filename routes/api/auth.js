const express = require('express');

const { signup, login } = require('../../controllers/auth');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup',
    validateBody(schemas.signupSchema),
    signup);

router.post('/login',
    validateBody(schemas.loginSchema),
    login);
    
router.post('/logout');
router.get('/current');

module.exports = router;