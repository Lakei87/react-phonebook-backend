const express = require('express');

const { authenticate, validateBody } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');
const { getAll, add, remove } = require('../../controllers/contacts');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/',
    authenticate,
    ctrlWrapper(getAll));

router.post('/',
    authenticate,
    validateBody(schemas.add),
    ctrlWrapper(add));

router.delete('/:id',
    authenticate,
    ctrlWrapper(remove));

module.exports = router;