'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Enrollments', [
      {
        userId: 1, // Alice
        courseId: 1, // Backend Development
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // Bob
        courseId: 2, // Advanced SQL
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1, // Alice
        courseId: 2, // Advanced SQL
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Enrollments', null, {});
  }
};
