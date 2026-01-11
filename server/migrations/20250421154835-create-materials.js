'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Materials', {
      material_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Courses', // pastikan nama tabel courses sesuai dengan migrasi tabel Courses
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      week: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      materials_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      materials_desc: {
        type: Sequelize.TEXT
      },
      materials_video: {
        type: Sequelize.STRING
      },
      materials_duration: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Materials');
  }
};
