'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Psychologists', [
      {
        name: 'Dr. Andini Pramesti, M.Psi',
        description: 'Psikolog dengan pengalaman 8 tahun dalam bidang klinis dewasa dan remaja.',
        handled_count: 12,
        location: 'Jakarta Selatan',
        location_url: 'https://maps.google.com/?q=Jakarta+Selatan',
        education_1: 'Universitas Padjadjaran | 2016 • Sarjana Psikologi',
        education_2: 'Universitas Padjadjaran | 2020 • Magister Psikologi',
        service_type: JSON.stringify(['onsite', 'e-counseling']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bapak Rudi Hartanto, M.Psi',
        description: 'Berfokus pada terapi keluarga dan psikologi perkembangan anak.',
        handled_count: 8,
        location: 'Bandung',
        location_url: 'https://maps.google.com/?q=Bandung',
        education_1: 'Universitas Padjadjaran | 2016 • Sarjana Psikologi',
        education_2: null,
        service_type: JSON.stringify(['e-counseling', 'home-visit']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Psychologists', null, {});
  }
};
