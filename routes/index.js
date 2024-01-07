const express = require('express');
const router = express.Router();

const questionsRouter = require('./questions');
const categoriesRouter = require('./categories');
const difficultiesRouter = require('./difficulties');

router.use('/questions', questionsRouter);
router.use('/categories', categoriesRouter);
router.use('/difficulties', difficultiesRouter);

module.exports = router;
