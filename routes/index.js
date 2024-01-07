const express = require('express');
const router = express.Router();

const questionsRouter = require('./questionsRouter');
const categoriesRouter = require('./categoriesRouter');
const difficultiesRouter = require('./difficultiesRouter');

router.use('/questions', questionsRouter);
router.use('/categories', categoriesRouter);
router.use('/difficulties', difficultiesRouter);

module.exports = router;

