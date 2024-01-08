const { Sequelize } = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.development);

const models = {
  Category: require('../models/category')(sequelize, Sequelize),
  Difficulty: require('../models/difficulty')(sequelize, Sequelize),
  Question: require('../models/question')(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => model.associate)
  .forEach(model => model.associate(models));

module.exports = { sequelize, Sequelize, models };
