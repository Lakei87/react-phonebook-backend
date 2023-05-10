const express = require('express');

const { signup, login } = require('../../controllers/auth');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup',
    validateBody(schemas.signupAndLoginSchema),
    signup);

router.post('/login', login);
router.post('/logout');
router.get('/current');

module.exports = router;