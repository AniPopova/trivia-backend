const express = require('express');
const { Category } = require('../models');

const router = express.Router();

// Endpoint to get all categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add other category-related endpoints as needed

module.exports = router;
