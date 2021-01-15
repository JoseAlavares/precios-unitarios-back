'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Plans', [{
      name: "Basic plan",
      stripeKey: "price_1I38H3KVlR6IqidnmYe3v5fr",
      price: 50.00,
      description: "Test product",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Plans', null, {});
  }
};
