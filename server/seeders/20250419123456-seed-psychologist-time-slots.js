'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const psychologistTimeSlots = [
      // Psikolog 1 bisa di jam Morning
      { psychologist_id: 1, time_slot_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { psychologist_id: 1, time_slot_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { psychologist_id: 1, time_slot_id: 3, createdAt: new Date(), updatedAt: new Date() },

      // Psikolog 2 bisa di jam Afternoon dan Evening
      { psychologist_id: 2, time_slot_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { psychologist_id: 2, time_slot_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { psychologist_id: 2, time_slot_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Psikolog 3 bisa semua slot
      ...[1,2,3,4,5,6,7,8].map(slotId => ({
        psychologist_id: 3,
        time_slot_id: slotId,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    ];

    await queryInterface.bulkInsert('PsychologistTimeSlots', psychologistTimeSlots, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PsychologistTimeSlots', null, {});
  }
};
