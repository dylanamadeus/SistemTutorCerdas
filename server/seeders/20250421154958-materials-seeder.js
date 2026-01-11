'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Materials', [
      {
        course_id: 6,
        week: 1,
        materials_title: 'Introduction to Programming',
        materials_desc: 'This material covers the basics of programming.',
        materials_video: 'https://youtube.com/sample-video-1',
        materials_duration: 45,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        course_id: 6,
        week: 2,
        materials_title: 'Variables and Data Types',
        materials_desc: 'Learn about variables, data types, and how to use them.',
        materials_video: 'https://youtube.com/sample-video-2',
        materials_duration: 50,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Materials', null, {});
  }
};
