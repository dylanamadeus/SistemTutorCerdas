'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Psychologists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      handled_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      education_1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      education_2: {
        type: Sequelize.STRING,
        allowNull: true
      },
      service_type: {
        type: Sequelize.TEXT,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('service_type');
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue('service_type', JSON.stringify(value));
        }
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
    await queryInterface.dropTable('Psychologists');
  }
};
