const { Category } = require('../models');

async function getAllCategories() {
  try {
    const allCategories = await Category.findAll({
      order: [['name', 'ASC']],
    });
    return allCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Internal Server Error');
  }
}

module.exports = {
  getAllCategories,
};
