const express = require('express');
const questionRouter = express.Router();
const { validate: isUUID } = require('uuid');
const quizService = require('../services/quiz.service');
const QuestionService = require('../services/questions.service'); 
const questionService = QuestionService; 

questionRouter.get('/quiz', async (req, res) => {
  try {
    const { category, difficulty, numQuestions } = req.query;
    const quiz = await quizService.generateQuiz({
      category,
      difficulty,
      numQuestions,
    });
    res.json(quiz); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

questionRouter.get('/all', async (req, res) => {
  try {
    const allQuestions = await questionService.getAllQuestions(); 
    res.json(allQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


questionRouter.get('/sort', async (req, res) => {
  try {
    const { difficultyId, categoryId } = req.query;

    // Validate difficultyId and categoryId as UUIDv4
    if (difficultyId && !isUUID(difficultyId, 4)) {
      return res.status(400).json({ error: 'Invalid difficultyId' });
    }

    if (categoryId && !isUUID(categoryId, 4)) {
      return res.status(400).json({ error: 'Invalid categoryId' });
    }

    const sortedQuestions = await questionService.getQuestionsSorted(difficultyId, categoryId);
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

