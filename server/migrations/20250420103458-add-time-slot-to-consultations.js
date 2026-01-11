'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Consultations', 'time_slot_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'TimeSlots',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Consultations', 'time_slot_id');
  }
};
