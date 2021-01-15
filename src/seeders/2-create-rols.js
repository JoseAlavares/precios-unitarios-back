'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rols', [
      {
        name: "administrator",         
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rols', null, {});
  }
};
