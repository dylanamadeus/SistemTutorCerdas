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
    await queryInterface.bulkInsert('Courses', [
      {
        title: 'Intro to Backend Development',
        description: 'Learn backend fundamentals with Express.js and Sequelize.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Anxiety Disorders',
        description: 'Anxiety Disorders adalah kelompok gangguan mental yang ditandai dengan rasa cemas atau takut yang berlebihan dan berlangsung dalam jangka waktu lama.',
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
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
