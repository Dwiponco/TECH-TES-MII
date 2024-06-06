'use strict';
const dayjs = require('dayjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

    await queryInterface.bulkInsert('employee_family', [
      {
        employee_id: 1,
        name: "Marni",
        identifier: "32100594109960002",
        job: "Ibu Rumah Tangga",
        place_of_birth: "Denpasar",
        date_of_birth: "1995-10-17",
        religion: "islam",
        is_life: true,
        is_divorced: false,
        relation_status: "Istri",
        created_by: "admin",
        updated_by: "admin",
        created_at: now,
        updated_at: now
      },
      {
        employee_id: 1,
        name: "Clara",
        identifier: "32100594109960004",
        job: "Pelajar",
        place_of_birth: "Bangkalan",
        date_of_birth: "2008-10-17",
        religion: "islam",
        is_life: true,
        is_divorced: false,
        relation_status: "Anak",
        created_by: "admin",
        updated_by: "admin",
        created_at: now,
        updated_at: now
      },
      {
        employee_id: 1,
        name: "Stephanie",
        identifier: "32100594109960005",
        job: "Pelajar",
        place_of_birth: "Bangkalan",
        date_of_birth: "2008-10-17",
        religion: "islam",
        is_life: true,
        is_divorced: false,
        relation_status: "Anak",
        created_by: "admin",
        updated_by: "admin",
        created_at: now,
        updated_at: now
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee_family', null, {});
  }
};
