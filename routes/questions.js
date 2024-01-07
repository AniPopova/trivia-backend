const express = require('express');
const { Op } = require('sequelize');
const { Question } = require('../models');

const router = express.Router();

// Endpoint to get all questions
router.get('/', async (req, res) => {
  try {
    const allQuestions = await Question.findAll();
    res.json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all questions sorted by difficulty
router.get('/sort-by-difficulty', async (req, res) => {
  try {
    const sortedQuestions = await Question.findAll({
      order: [['difficultyId', 'ASC']],
    });
    res.json(sortedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all questions sorted by category
router.get('/sort-by-category', async (req, res) => {
  try {
    const sortedQuestions = await Question.findAll({
      order: [['categoryId', 'ASC']],
    });
    res.json(sortedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
