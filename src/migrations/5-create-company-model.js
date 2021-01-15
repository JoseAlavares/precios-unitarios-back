'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PlanId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Plans',
            key: 'id' 
          }          
        }
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      rfc: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      legalRepresentative: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      active: Sequelize.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies');
  }
};