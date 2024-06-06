'use strict';
const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

    await queryInterface.bulkInsert('employee_profile', [
      {
        employee_id: 1,
        place_of_birth: "Jakarta",
        date_of_birth: "1997-05-02",
        gender: "laki-laki",
        is_married: true,
        prof_pict: null,
        created_by: "admin",
        updated_by: "admin",
        created_at: now,
        updated_at: now
      },
      {
        employee_id: 2,
        place_of_birth: "Sukabumi",
        date_of_birth: "1996-05-02",
        gender: "laki-laki",
        is_married: false,
        prof_pict: null,
        created_by: "admin",
        updated_by: "admin",
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee_profile', null, {});
  }
};
