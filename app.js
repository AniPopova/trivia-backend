'use strict';
const express = require('express');
const expressListEndpoints = require('express-list-endpoints'); 
const { sequelize } = require('./config/sequelize');
const app = express();
const PORT = process.env.PORT || 3000;
//const routes = require('./routes'); 

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

//app.use(routes);

app.get('/api/endpoints', (req, res) => {
  const endpoints = [
    ...expressListEndpoints(questionsRouter),
    ...expressListEndpoints(categoriesRouter),
    ...expressListEndpoints(difficultiesRouter),
  ];
  res.json(endpoints);
});

sequelize.sync()
  .then(() => {
    // Start the server only if syncing with the database.
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

