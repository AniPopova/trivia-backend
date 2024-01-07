const express = require('express');
const { sequelize } = require('./config/sequelize'); 
const app = express();
const PORT = process.env.PORT || 3000;
const models = require('./models');

app.use((req, res, next) => {
  console.log('Request:', req.method, req.originalUrl);
  next();
});

app.use(express.json());

const questionsRouter = require('./routes/questionsRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const difficultiesRouter = require('./routes/difficultiesRouter');

app.use('/questions', questionsRouter);
app.use('/categories', categoriesRouter);
app.use('/difficulties', difficultiesRouter);

// Sync the database before starting the server
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
