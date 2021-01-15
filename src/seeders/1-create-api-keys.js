'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ApiKeys', [{
      value: 'API-KEY.645cd8da39868556b0e062345ba80dc304535dc6390acf44258c2a27473ece03',
      clientName: 'web client',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      value: 'API_KEY.67eaaf1f64f421590be01948f6d53d147ca6ed4b8653ea1cc5abdff0baf15ac9',
      clientName: 'tests client',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {    
    await queryInterface.bulkDelete('ApiKeys', [{}], {})
  }
};
