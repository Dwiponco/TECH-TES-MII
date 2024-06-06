'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employee_family', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employee',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      identifier: {
        type: Sequelize.STRING(17),
        allowNull: true
      },
      job: {
        type: Sequelize.STRING,
        allowNull: true
      },
      place_of_birth: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      religion: {
        type: Sequelize.ENUM('islam', 'katolik', 'buda', 'protestan', 'konghucu'),
        allowNull: false
      },
      is_life: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_divorced: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      relation_status: {
        type: Sequelize.ENUM('Suami', 'Istri', 'Anak', 'Anak Sambung'),
        allowNull: false
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employee_family');
  }
};
