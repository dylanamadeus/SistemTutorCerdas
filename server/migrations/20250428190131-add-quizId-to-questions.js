'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // Menghapus kolom courseId yang lama
    await queryInterface.removeColumn('Questions', 'courseId');
    
    // Menambahkan Foreign Key pada table question
    await queryInterface.addColumn('Questions', 'quizId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Quiz',  
        key: 'id',      
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Menghapus kolom userId jika migrasi dibatalkan
    await queryInterface.removeColumn('Questions', 'quizId');
  }
};
