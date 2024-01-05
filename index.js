const fs = require('fs');
const path = require('path');

const models = {};

fs.readdirSync(path.join(__dirname, 'trivia-backend', 'models'))
  .filter((file) => file !== 'index.js' && file.endsWith('.js'))
  .forEach((file) => {
    const modelName = file.replace('.js', '');
    models[modelName] = require(path.join(__dirname, 'trivia-backend', 'models', file));
  });

module.exports = models;
// const models = require('./trivia-backend/models/index.js');
