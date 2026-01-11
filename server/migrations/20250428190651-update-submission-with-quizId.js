'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hapus kolom courseId
    await queryInterface.removeColumn('Submissions', 'courseId');

    // Tambahkan kolom quizId
    await queryInterface.addColumn('Submissions', 'quizId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Quiz',  // Menghubungkan ke tabel quiz
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Jika rollback, tambahkan kembali kolom courseId
    await queryInterface.addColumn('Submissions', 'courseId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses',  // Menghubungkan ke tabel Courses
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Hapus kolom quizId jika rollback
    await queryInterface.removeColumn('Submissions', 'quizId');
  }
};
