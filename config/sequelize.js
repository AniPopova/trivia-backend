const { Sequelize } = require('sequelize');
const path = require('path');
const config = require('./config.json');

const sequelize = new Sequelize(config.development);

// Load models
const models = {
  Category: require('../models/category')(sequelize, Sequelize),
  Difficulty: require('../models/difficulty')(sequelize, Sequelize),
  Question: require('../models/question')(sequelize, Sequelize),
};

// Apply associations
Object.values(models)
  .filter(model => model.associate)
  .forEach(model => model.associate(models));

// Export everything in a single object
module.exports = { sequelize, Sequelize, models };
