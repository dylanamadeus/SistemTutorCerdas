'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      options: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      correctIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      courseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Courses',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questions');
  }
};
