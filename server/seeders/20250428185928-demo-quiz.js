'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Quiz', [
      {
        courseId: 6,  // Pastikan courseId 1 ada di tabel Courses
        duration: 300,  // Durasi quiz dalam detik (300 detik = 5 menit)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 5,  // Pastikan courseId 2 ada di tabel Courses
        duration: 600,  // Durasi quiz dalam detik (600 detik = 10 menit)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        courseId: 3,  // Pastikan courseId 3 ada di tabel Courses
        duration: 900,  // Durasi quiz dalam detik (900 detik = 15 menit)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quiz', null, {});
  }
};
