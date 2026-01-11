'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TimeSlots', [
      // Morning
      {
        code: 'M1',
        start_time: '08:00',
        end_time: '09:00',
        category: 'Morning',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'M2',
        start_time: '09:15',
        end_time: '10:15',
        category: 'Morning',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'M3',
        start_time: '10:30',
        end_time: '11:30',
        category: 'Morning',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Afternoon
      {
        code: 'A1',
        start_time: '13:00',
        end_time: '14:00',
        category: 'Afternoon',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'A2',
        start_time: '14:15',
        end_time: '15:15',
        category: 'Afternoon',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'A3',
        start_time: '15:30',
        end_time: '16:30',
        category: 'Afternoon',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'A4',
        start_time: '16:45',
        end_time: '17:45',
        category: 'Afternoon',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Evening
      {
        code: 'E1',
        start_time: '19:30',
        end_time: '20:30',
        category: 'Evening',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: 'E2',
        start_time: '20:45',
        end_time: '21:45',
        category: 'Evening',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TimeSlots', null, {});
  }
};
