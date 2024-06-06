'use strict';
const dayjs = require('dayjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
    await queryInterface.bulkInsert('employee', [
      {
        nik: 11012,
        name: "budi",
        is_active: true,
        start_date: "2022-12-12",
        end_date: "2029-12-12",
        created_by: "admin",
        updated_by: "admin",
        created_at: now,
      },
      {
        nik: 11013,
        name: "jarot",
        is_active: true,
        start_date: "2021-09-01",
        end_date: "2028-09-01",
        created_by: "admin",
        updated_by: "admin",
        created_at: now,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee', null, {});
  }
};
