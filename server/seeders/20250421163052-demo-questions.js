'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', [
      {
        text: 'What is 2 + 2?',
        options: JSON.stringify([2, 3, 4, 5]),
        correctindex: 2,  // Pilihan yang benar adalah 4 (index 2)
        quizId: 7,  // Pastikan quizId 1 ada di tabel quiz
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'What is the capital of France?',
        options: JSON.stringify(['Berlin', 'Madrid', 'Paris', 'Rome']),
        correctindex: 2,  // Pilihan yang benar adalah Paris (index 2)
        quizId: 8,  // Pastikan quizId 1 ada di tabel quiz
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Which of the following is a programming language?',
        options: JSON.stringify(['HTML', 'Python', 'CSS', 'HTTP']),
        correctindex: 1,  // Pilihan yang benar adalah Python (index 1)
        quizId: 9,  // Pastikan quizId 2 ada di tabel quiz
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
