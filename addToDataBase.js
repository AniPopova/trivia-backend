// addDataToDatabase.js

const fs = require('fs');
const Question = require('./models/question.js');

// Read and parse the JSON file
const data = JSON.parse(fs.readFileSync('./trivia_data.json', 'utf8'));

// Extract and add data to the database
async function addDataToDatabase() {
  try {
    await Question.sync({ force: true }); // This will recreate the table; use carefully in production
    await Question.bulkCreate(data.results);
    console.log('Data added to the database successfully.');
  } catch (error) {
    console.error('Error adding data to the database:', error);
  } finally {
    await Question.sequelize.close();
  }
}

// Call the function to add data to the database
addDataToDatabase();
