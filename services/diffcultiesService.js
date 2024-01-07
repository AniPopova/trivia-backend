const { Difficulty } = require('../models');

async function getAllDifficulties() {
  try {
    const allDifficulties = await Difficulty.findAll({
      order: [['name', 'ASC']],
    });
    return allDifficulties;
  } catch (error) {
    console.error('Error fetching difficulties:', error);
    throw new Error('Internal Server Error');
  }
}

module.exports = {
  getAllDifficulties,
};

