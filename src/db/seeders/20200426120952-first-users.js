'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'test-admin@gmail.com',
        password: '$2b$10$nRJYo0MBx7P6W75uFabPHulWml94RVRlFil5rN1UNiuksMx43HYK2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
