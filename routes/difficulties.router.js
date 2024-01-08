const express = require('express');
const difficultyService = require('../services/difficulties.service');

const difficultyRouter = express.Router();

difficultyRouter.get('/', async (req, res) => {
  try {
    const allDifficulties = await difficultyService.getAllDifficulties();
    res.json(allDifficulties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = difficultyRouter; 

