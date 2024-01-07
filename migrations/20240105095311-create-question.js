// migrations/xxxxxxxxxxxxxx-create-question.js
'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: () => uuidv4(),
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      difficultyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Difficulties',
          key: 'id',
        },
      },
      categoryId: { // Change field name to categoryId
        type: Sequelize.UUID, 
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correct_answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      incorrect_answers: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questions');
  },
};

