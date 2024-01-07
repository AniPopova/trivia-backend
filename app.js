const express = require('express');
const app = express();

// Include your models
const models = require('./models');

// Include your routes
const questionsRouter = require('./routes/questions');
const categoriesRouter = require('./routes/categories');
const difficultiesRouter = require('./routes/difficulties');

// Middleware to log requests
app.use((req, res, next) => {
  console.log('Request:', req.method, req.originalUrl);
  next();
});

// Use your routes
app.use('/questions', questionsRouter);
app.use('/categories', categoriesRouter);
app.use('/difficulties', difficultiesRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
