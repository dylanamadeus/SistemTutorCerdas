// 

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambahkan constraint foreign key ke kolom userId yang sudah ada
    await queryInterface.addConstraint('Submissions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_submissions_userId',  // kasih nama unik
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Hapus constraint foreign key jika rollback
    await queryInterface.removeConstraint('Submissions', 'fk_submissions_userId');
  }
};
