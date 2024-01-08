'use strict';
const express = require('express');
const { sequelize } = require('./config/sequelize');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes'); 

//fixing the anonymous type of the middleware
app.use(function logRequest(req, res, next) {
  console.log('Request:', req.method, req.originalUrl);
  next();
});

// Middleware: Parse incoming requests with JSON payloads
app.use(express.json());

// Use the defined routes for the application
app.use(routes);

// Sync the Sequelize models with the database
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

