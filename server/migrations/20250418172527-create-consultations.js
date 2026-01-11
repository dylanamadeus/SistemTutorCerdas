'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Consultations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      psychologist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Psychologists',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      type_of_service: {
        type: Sequelize.ENUM('onsite', 'e-counseling', 'home-visit'),
        allowNull: false
      },
      consult_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      consult_time: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending'
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
    await queryInterface.dropTable('Consultations');
  }
};
