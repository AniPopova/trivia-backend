const express = require('express');
const { Difficulty } = require('../models');

const router = express.Router();

// Endpoint to get all difficulties
router.get('/', async (req, res) => {
  try {
    const allDifficulties = await Difficulty.findAll();
    res.json(allDifficulties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add other difficulty-related endpoints as needed

module.exports = router;
