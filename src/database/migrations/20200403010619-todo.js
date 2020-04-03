'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Todos', [{
        title: 'Migration',
        completed: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {
      title: 'Migration'
    });
  }
};
