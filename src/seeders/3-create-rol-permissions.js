'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RolPermissions', [{
      RolId: 1,
      name: 'CREATE_USER',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      RolId: 1,
      name: 'READ_USER',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      RolId: 1,
      name: 'UPDATE_USER',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      RolId: 1,
      name: 'DELETE_USER',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RolPermissions', null, {})
  }
};
