'use strict';
const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
    await queryInterface.bulkInsert('education', [
      {
        employee_id: 1,
        name: "SMKN 7 Jakarta",
        level: "sma",
        description: "Sekolah Menengah Atas",
        created_by: "admin",
        updated_by: "admin",
        created_at: now,
        updated_at: now
      },
      {
        employee_id: 2,
        name: "Universitas Negeri Jakarta",
        level: "strata 1",
        description: "Sarjana",
        created_by: "admin",
        updated_by: "admin",
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('education', null, {});
  }
};
