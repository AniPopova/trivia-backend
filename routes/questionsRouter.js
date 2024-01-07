const express = require('express');
const { Question } = require('../models');
const questionRouter = express.Router();
const quizService = require('../services/quizService'); 

questionRouter.get('/api/questions/quiz', async (req, res) => {
  try {
    const result = await quizService.generateQuiz(req.query);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

questionRouter.get('/api/questions/all-questions', async (req, res) =>{
  try {
    const allQuestions = await Question.findAll();
    res.json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

questionRouter.get('/api/questions/all-questions-with-details', async (req, res) => {
  try {
    const allQuestions = await Question.findAll({
      include: ['category', 'difficulty'],
    });
    res.json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

questionRouter.get('/api/questions/filter', async (req, res) => {
  const { difficulty } = req.query;

  try {
    const filteredQuestions = await Question.findAll({
      where: { difficulty },
    });
    res.json(filteredQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

questionRouter.get('/api/questions/sort-by-difficulty', async (req, res) => {
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

questionRouter.get('/api/questions/sort-by-category', async (req, res) => {
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

module.exports = questionRouter;
