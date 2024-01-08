const express = require('express');
const router = express.Router();

const questionsRouter = require('./questions.router');
const categoriesRouter = require('./categories.router');
const difficultiesRouter = require('./difficulties.router');

router.use('/questions', questionsRouter);
router.use('/categories', categoriesRouter);
router.use('/difficulties', difficultiesRouter);

module.exports = router;

