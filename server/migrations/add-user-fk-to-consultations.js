'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Consultations', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_consultation_user_id',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Consultations', 'fk_consultation_user_id');
  }
};
