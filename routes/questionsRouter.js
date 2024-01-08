const express = require('express');
const questionRouter = express.Router();
const quizService = require('../services/quizService');
const QuestionService = require('../services/questionsService'); 
const questionService = QuestionService; 

questionRouter.get('/quiz', async (req, res) => {
  try {
    const { category, difficulty, numQuestions } = req.query;
    const result = await quizService.generateQuiz({ category, difficulty, numQuestions });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
questionRouter.get('/all-questions', async (req, res) => {
  try {
    const allQuestions = await questionService.getAllQuestions(); 
    res.json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

questionRouter.get('/all-questions-with-details', async (req, res) => {
  try {
    const allQuestions = await questionService.getAllQuestionsWithDetails(); 
    res.json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


questionRouter.get('/filter', async (req, res) => {
  const difficulty = req.query.difficulty;
  try {
    const filteredQuestions = await questionService.getFilteredQuestionsByDifficulty(difficulty);
    res.json(filteredQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

questionRouter.get('/sort-by-difficulty', async (req, res) => {
  try {
    const difficultyName = req.query.difficultyName;
    const sortedQuestions = await questionService.getQuestionsSortedByDifficulty(difficultyName);
    res.json(sortedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

questionRouter.get('/sort-by-category', async (req, res) => {
  try {
    const categoryName = req.query.categoryName;
    const sortedQuestions = await questionService.getQuestionsSortedByCategory(categoryName);
    res.json(sortedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


questionRouter.use((req, res, next) => {
  console.log('Executing questionsRouter middleware');
  next();
});

module.exports = questionRouter;

