const express = require('express');
const { Difficulty } = require('../models');
const difficultyService = require('../services/difficultyService');

const difficultyRouter = express.Router();

difficultyRouter.get('/all-difficulties-sorted', async (req, res) => {
  try {
    const allDifficulties = await difficultyService.getAllDifficulties();
    res.json(allDifficulties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = difficultyRouter; 

