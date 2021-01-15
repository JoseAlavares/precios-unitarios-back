'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Companies', [{
      PlanId: 1,
      name: "Cubix software",
      rfc: "AAVF890309KB2",
      email: "alvaresvaldes89@gmail.com",
      legalRepresentative: "Jose Francisco Alvarez Valdez",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Companies', null, {})
  }
};
