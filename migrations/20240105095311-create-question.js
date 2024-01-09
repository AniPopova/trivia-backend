'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn('gen_random_uuid'),
      },
      type: {
        type: DataTypes.STRING, 
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
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      question: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      correctAnswer: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      incorrectAnswers: {
        type: DataTypes.JSONB, 
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Questions');
  },
};
