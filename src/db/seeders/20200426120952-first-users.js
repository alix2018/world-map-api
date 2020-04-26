'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'test-admin@gmail.com',
        password: 'aB123456@',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
