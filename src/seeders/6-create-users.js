'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        RolId: 1,
        CompanyId: 1,
        name: "José Francisco Alvarez Valdez", 
        email: "alvaresvaldes89@gmail.com", 
        password: "$2b$10$finIKTLdrDVGkKtzRF.UUuDl13fUt.ZAqYdbDHtw50RM0TyE6DREy",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
